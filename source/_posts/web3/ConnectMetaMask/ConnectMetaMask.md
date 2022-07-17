---
title: 链接 MetaMask Web3 钱包
date: 2022-07-17 08:56:53
tags:
    - 以太坊
    - metamask
categories: 
    - Web3.0
---
<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">
<script src="https://code.jquery.com/jquery-3.6.0.slim.min.js" integrity="sha256-u7e5khyithlIdTpu22PHhENmPcRdFiHRjhAuHcs05RI=" crossorigin="anonymous"></script>
<script src="https://cdn.ethers.io/lib/ethers-5.2.umd.min.js" type="application/javascript"></script>

>A crypto wallet & gateway to blockchain apps

MetaMask 是管理私钥的钱包工具，大多数 EVM生态 Web3 Dapp 都支持使用 MetaMask  

MetaMask 的安装方式 有两种手机、浏览器插件，可以在官网查看(不要点击下载直连，因为你不知道这个链接的真实性)  

[MeteMask 官网](https://metamask.io/)  

在 Crypto 世界中的私钥是最需要隐藏的，一旦丢失了你的私钥，你的一切资产将可能被人一扫而空  
MetaMask 用插件方式托管了你的私钥，并在你需要交互的时候给你相应的提示：签名、授权、发起交易  
这样我们可以在不输入私钥的同时保证了交互的正常(当然，导入助记词或者私钥也会有泄露风险，可以使用硬件钱包)  

如果你已经成功安装了 MetaMask 并拥有了自己的钱包地址，你可以使用下方的按钮进行链接  
<button type="button" id="post_connect" class="btn btn-primary">Connect Web3.0</button>  

当链接成功后，按钮上会显示你的钱包地址  




<script>
$(document).ready(function(){
    $("#post_connect").click(async function(){
        let provider;
        if(window.ethereum){
            try{
              provider =  await  new ethers.providers.Web3Provider(window.ethereum)
            }catch(error){
                console.error("user denied account access");
            }
        account = await provider.send("eth_requestAccounts", []);
        $(this).text("已连接："+account);
        }else{
            alert("please install wallet");
        }
    });
    

});
</script>

