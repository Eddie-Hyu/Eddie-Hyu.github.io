import gradio as gr
import openai
from flask import Flask, request, render_template, Response

# OPENAI_URL = 'https://kimifreeapi.shadow.cloudns.org/v1'
API_KEY = 'sk-qGcOh78VhWAxe8c1Op4nkQwEgY1lt8XSmXkqHjGPvDprQ0f2'
OPENAI_URL = 'https://api.chatanywhere.tech/v1'

def get_chat_completion(model="gpt-3.5-turbo", content="Why is the sky blue?", chat_id="",chat_message=[{"role": "assistant","content":"you will speak chinese always"}], stream=False, temperature=1, max_token=1024):
    usr_message = {"role": "user", "content": content}
    messages = [{"role": "system","content":"you will speak chinese always"}]
    for mes in chat_message:
        messages.append(mes)
    messages.append(usr_message)
    client = openai.OpenAI(
        base_url=OPENAI_URL,
        api_key=API_KEY
    )
    response = client.chat.completions.create(
        model=model,
        messages=messages,
        # temprature=0.7,
        stream = stream,
    )
    print(response)
    if stream==False:

        return response.id,response.choices[0].message,[response.choices[0].message.content]
    else:
        chat_contents = ""
        for ck in response:
            # print(ck)
            if ck.choices[0].delta.content is not None:
                chat_id = ck.id
                chat_content = ck.choices[0].delta.content
                chat_contents += chat_content
        chat_messages = messages + [{"role": "assistant", "content": chat_contents}]
        return chat_id, chat_messages, chat_contents


conversation_history = []


def chat_response(message,history):
    input_message = {"role": "user", "content": message}
    global conversation_history

    if len(conversation_history) > 10:
        conversation_history = conversation_history[:10]
    conversation_history.append(input_message)

    _, chat_messages, chat_contents = get_chat_completion(content=message, chat_message=conversation_history, stream=True)
    conversation_history = chat_messages
    yield chat_contents

# # 初始化你的 ChatInterface
# def get_chat_interface():
#     # 这里应该是你的 ChatInterface 初始化代码
#     chat = gr.ChatInterface(chat_response).launch()
#     return chat
# chat_interface = get_chat_interface()
#
# app = Flask(__name__)
#
#
# @app.route('/', methods=['POST'])
# def chat():
#     # 接收用户输入并调用 ChatInterface 进行交互
#     user_input = request.form['user_input']
#     response = chat_interface.process(user_input)
#     return Response(response, mimetype='application/json')

from fastapi import FastAPI,Request
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates

app = FastAPI()
chat_ui = gr.ChatInterface(chat_response)

templates = Jinja2Templates(directory=".")
app.mount("/", StaticFiles(directory="."), name="index")
app = gr.mount_gradio_app(app, chat_ui, path="/gradio_chat")

@app.get("/")
def home(request: Request):
    return templates.TemplateResponse(
        "index.html",
        {
            "request": request
        }
    )
if __name__ == '__main__':
    # app.run(debug=True)
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8001)