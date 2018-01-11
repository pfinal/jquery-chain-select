/**
 * jQuery 多级联动下拉框插件
 * @author  Zou Yiliang
 * @since   1.0
 * @date    2014-10-25
 */
(function ($) {
    $.fn.extend({
        chainSelect: function (options) {
            //级联操作对象
            var chain = this;

            //级联操作的select配置内容
            var selectConfig = options.items;

            //级联操作的select对象
            var selectObjects = [];

            $(chain).empty();
            for (var i = 0; i < selectConfig.length; i++) {
                if (!selectConfig[i]) {
                    break;
                }

                selectObjects[i] = $(makeSelect(selectConfig[i].name));

                if ($(selectObjects[i]).is('select')) {
                    selectObjects[i].attr("data-index", i);
                } else {
                    selectObjects[i].find('select').attr("data-index", i);
                }

                $(chain).append(selectObjects[i]);

                if (!$(selectObjects[i]).is('select')) {
                    selectObjects[i] = $(selectObjects[i]).find('select');
                }

                //加载默认的提示项prompt
                fillSelect(selectObjects[i], [], selectConfig[i].prompt);

                //注册下拉选择事件
                selectObjects[i].change(function () {
                    //加载下级的数据
                    changeNext(this);

                });

            }

            //加载第一层的数据
            fillSelect(selectObjects[0], getOptionData(0), selectConfig[0].prompt);

            //处理默认选中项
            for (var i = 0; i < selectObjects.length; i++) {
                var val = selectConfig[i].selected;
                if (!activeOptionByValue(selectObjects[i], val)) {
                    break;
                }
                //已有默认选中项时，装载下层数据
                if (i + 1 < selectObjects.length) {
                    fillSelect(selectObjects[i + 1], getOptionData(val), selectConfig[i + 1].prompt);
                }
            }

            //加载下级的数据，清空所有下下级数据(被选中事件)
            function changeNext(select) {

                var val = $(select).val();

                //当前层级
                var layer = parseInt($(select).attr("data-index"));

                //清空所有下级
                for (var i = layer + 1; i < selectObjects.length; i++) {
                    //加载默认的提示项prompt
                    fillSelect(selectObjects[i], [], selectConfig[i].prompt);
                }

                //当前选中项为prompt
                if (val == "") {
                    return;
                }

                //加载下级对应城市数据
                if (layer + 1 < selectObjects.length) {
                    fillSelect(selectObjects[layer + 1], getOptionData(val), selectConfig[layer + 1].prompt);

                    //当只有一个选项时，不能触发change事件，所以在这里加载下级的数据
                    changeNext(selectObjects[layer + 1])
                }
            }

            /**
             * 返回下拉选项的数据
             * 例如: 获取id为3的所有下级: getOptionData(3)  如果parent为0，则返回第一个select的数据
             * @param int pid 上级地区id
             */
            function getOptionData(pid) {

                if (typeof options.optionData == "string") {

                    var url = options.optionData;
                    var data = $.ajax({
                        url: url,
                        async: false,
                        data: {pid: pid}
                    }).responseText;

                    //[{"id":"11","name":"上海"},{"id":"12","name":"北京"},{"id":"13","name":"广东省"},{"id":"14","name":"江苏省"}]
                    return $.parseJSON(data);
                } else {
                    return options.optionData(pid);
                }
            }

            /**
             * 给select填充option数据
             * @param object select 下拉选择框对象
             * @param data 数据格式 [{"id":"11","name":"上海"},{"id":"12","name":"北京"},{"id":"13","name":"广东省"},{"id":"14","name":"江苏省"}]
             * @param prompt 第一个提示项 可以为空。 "请选择"
             */
            function fillSelect(select, data, prompt) {
                var str = '';
                if (!!prompt) {
                    str = makeOption(prompt, "")
                }
                for (var i = 0; i < data.length; i++) {
                    str += makeOption(data[i].name, data[i].id);
                }

                $(select).html(str);

                if (data.length == 1) {
                    activeOptionByValue(select, data[0].id);
                }
            }

            /**
             * 生成option项
             * @param display
             * @param value
             * @return string
             */
            function makeOption(display, value) {
                if (typeof options.tplOption == "function") {
                    return options.tplOption(display, value);
                }
                return '<option value="' + value + '">' + display + '</option>';
            }

            /**
             * 生成select
             * @param name
             * @returns string
             */
            function makeSelect(name) {
                if (typeof options.tplSelect == "function") {
                    return options.tplSelect(name);
                }
                return '<select name="' + name + '"></select>';
            }

            //激活选中指定value的项，成功返回true
            function activeOptionByValue(select, value) {

                if (typeof options.activeOption == "function") {
                    return options.activeOption(select, value);
                }

                var option = $("option[value='" + value + "']", select);
                if (option.length == 1) {
                    option.get(0).selected = true;
                    return true;
                }
                return false;
            }

        }
    })
})(jQuery);