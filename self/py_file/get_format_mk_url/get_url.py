def get_url(left,right,numleft,numright=None):
    if numright is not None:
       for i in range(numleft,numright):
           res = left+str(i)+right
           print(res)
    elif numright is None:
        for i in range(numleft):
            res = left + str(i) + right
            print(res)

if __name__=="__main__":
    a = "![](https://heishenhua.com/img/Concept/blackmyth_wukong_concept_0"
    b = ".jpg)"
    get_url(a,b,5,10)

