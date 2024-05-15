---
title: win10更新后出现“其他用户”且无法登录解决
author: leidada
date: 2024-05-15 16:45
updated: 2024-05-15 16:45
comments: false
abbrlink: fc8bc3f6
description: 
cover: 
categories: 
keywords: windows,问题解决
tags:
---
## 前言

最近为了用上最新版的docker，把win10系统进行升级，PC的开发环境基本上焕然一新，跟新买的电脑差不多了。结果win10更新完，系统进不去了，登录页面选不了用户，只有“其他用户”选项，里面的用户登录、微软账户登录都没用了。
	
		<img src="{%normal%}poster/win10/win10-1.jpg">win10-1</img>.jpg

## 查到的方法

查了网上很多类似的教程主要都是以下几种：
> 1、重启电脑就好了；废话，重启有用的话我还用百度吗'
>
> 2、长按关机三次进入【修复模式】；*傻乎乎试过，并没有用*
>
> 3、按住Shift，并点击`重启`；*''是有用的，能直接进到修复模式''*
> 
> 4、进入`修复模式`后，选`问题修复`、`重置系统`、`还原`...*''基本无效''*
> 
> 5、进入`修复模式`后，用命令提示符新增用户；*''可能有的有用，但我无效''*
> ①按住Shift之后点击重启，进入`修复模式`。
		
		<img src="{%normal%}poster/win10/win10-02.jpg">win10-2</img>.jpg
		<img src="{%normal%}poster/win10/win10-03.jpg">win10-3</img>.jpg

		
> ②选择【命令提示符】，这时候需要输入administrator账号密码。一般新系统的密码是空，直接回车就行；
> 
> ③用命令增加用户（详细内容看正式解决方案内）
```powershell
	# 增加新账户
	net user [账户名] [密码] /add
	# 给用户授权管理员
	net localgroup administrators [用户名] /add
```
> ④问题：每次新增之后重启，新增的用户都会消失。所以最后并没有起到有效作用

## 正式解决方案
最后验证有效的方式是：

①重启，并一直按F4，进入【安全模式】；
	
②**(很重要)点击【轻松使用】按钮，进入【命令提示符】；（只有安全模式点击才能打开命令提示词）
	
③新增用户及授权。
```powershell
# 新增用户&密码
net user [用户名] [密码] /add
# 给用户授权（加入用户组）,administrators是管理员组，权限最高
net localgroup administrators [用户名] /add
# 查看用户信息/删除用户
net user [用户名] /delete
# 查看某个用户(不输名字查看所有)
net user [用户名]
```
	# 其他命令
	```
	/add                  添加用户
	/delete              删除用户
	/domain           指定在域控中执行
	/active:{yes | no}   是否激活，默认是
	/comment:”text”    为账户设定描述信息
	/expires:{date | never}   设定过期时间
	/homedir:{directory}      指定用户的家目录
	/passwordchg:{yes | no}  是否允许用户自己更改密码，默认是
	/passwordreq:{yes | no}   指定用户是否必须设置密码，默认是
	/profilepath[:path]             指定用户配置文件路径
	/scriptpath:[:filename]      用户登录脚本位置
	/times:{times | all}             指定用户可以登录的时间
	/usercomment:”text”          使管理员可以更改此账户的描述信息
	/workstations:{computername[,…] | *}    指定主机名能够登录此账户
	```
	# 其他相关命令
	```
	# 用可视化界面新增用户
	netplwiz
	# 用可视化页面修改注册表(可以用来移动文件等)
	regedit
	```
	
④新增完用户就可以直接进去啦（因为不用重启，可以直接用新账户登录）

