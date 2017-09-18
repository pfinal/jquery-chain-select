# jQuery 多级联动下拉框插件

##  使用示例

```
<script src="//code.jquery.com/jquery-1.10.2.js"></script>
<script src="jquery-chain-select.js"></script>
    
<span id="js-chain-demo1"></span>

<script>

    $(function () {
        $("#js-chain-demo1").chainSelect({
            optionData: "jquery-chain-select.php", //设置ajax获取下拉选项数据的url
            items: [
                {name: 'province', selected: "13", prompt: '--选择省--'},
                {name: 'city', selected: "41", prompt: '--选择市--'},
                {name: 'county', selected: "52", prompt: '--选择区县--'},
            ]
        })
    });
</script>

```

![](doc/1.png)
