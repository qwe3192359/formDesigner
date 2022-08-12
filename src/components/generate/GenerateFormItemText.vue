<!--预览表单组件-->
<template>
    <div class="list" :class="formStyle">
        <!--反写表单-->
        <div class="item label">
            {{widget.type === 'compound'? widget.columns[1].names[language]:widget.names[language]}}
            <template v-if="formStyle === 'style1' ">
                ：
            </template>
        </div>
        <div class="item text">
            {{dataModel}}
        </div>
    </div>
</template>

<script>
    import request from '../../util/request'

    export default {
        name: 'generate-form-text',
        props: {
            //配置数据
            widget: null,
            //表单数据
            formData: null,

            language: null,
            dictUrl: null,
            //表单反写样式
            formStyle: null
        },
        data () {
            return {
                //下拉框数据字典
                options: [],

            }
        },
        computed: {
            //表单关联
            isShow(){
                let data = this.widget;
                //描点初次加载是否显示表单
                if (data.options && data.options.bindKey && data.options.bindFun) {
                    let newData = data.options.bindFun.replace(data.options.bindKey, 'this.widget[this.widget.options.bindKey]');
                    return eval(newData);
                }
            },
            //显示文字
            dataModel: {
                get: function () {
                    //复合
                    //开关
                    //级联
                    //时间单个，时间范围，日期单个，日期多选
                    //下拉单个，多个，本地数据，字典数据
                    //单选，本地数据，字典数据
                    //多选，本地数据，字典数据
                    //输入框，文本域，评分，颜色，滑块，计数器
                    let value = this.formData[this.widget.model];

                    if(this.widget.type === 'compound'){
                        let selectValue = '-';
                        let inputValue = '-';
                        if(this.formData[this.widget.columns[0].model] || this.formData[this.widget.columns[0].model] === 0){
                            if(this.widget.columns[0].options.remote){
                                selectValue = this.dictValue(this.options,value)
                            }
                            else if(!this.widget.columns[0].options.remote){
                                selectValue = this.optionsValue(this.widget.columns[0].options.options,value);
                            }
                        }

                        if(this.formData[this.widget.columns[1].model]){
                            inputValue = this.formData[this.widget.columns[1].model];
                        }

                        return selectValue + inputValue;
                    }
                    else if(this.widget.type === 'switch'){
                        if(value === true){
                            return '是'
                        }
                        else if(value === false){
                            return '否'
                        }
                        else{
                            return '-'
                        }
                    }
                    //级联
                    else if(this.widget.type === 'cascader'){

                    }
                    else if(this.widget.type === 'time' ){
                        if( (Array.isArray(value) && value.length === 0) || !value){
                            return '-'
                        }
                        //时间范围
                        else if(this.widget.options.range){
                            return value[0]+'-'+value[1]
                        }
                        else{
                            return String(value);
                        }

                    }
                    else if(this.widget.type === 'date'){
                        if( (Array.isArray(value) && value.length === 0) || !value){
                            return '-'
                        }
                        //日期范围
                        else if(this.widget.options.dateType === 'daterange' || this.widget.options.dateType === 'monthrange'){
                            return value[0]+'-'+value[1]
                        }
                        else{
                            return String(value);
                        }
                    }
                    else if(this.widget.type === 'select' || this.widget.type === 'radio' || this.widget.type === 'checkbox'){
                        if( (Array.isArray(value) && value.length === 0) || (!(value === 0) && !value) ){
                            return '-';
                        }
                        else if(this.widget.options.remote){
                            return this.dictValue(this.options,value)
                        }
                        else if(!this.widget.options.remote){
                            return this.optionsValue(this.widget.options.options,value);
                            console.log(this.dataModel)
                        }

                    }
                    else{
                        if(value || value === 0){
                            return value;
                        }
                        else{
                            return '-';
                        }

                    }
                },
                // setter
                set: function (newValue) {
                    return newValue
                }
            }

        },
        created () {
            //下载数据字典数据
            if (this.widget.options && this.widget.options.remote && this.widget.options.dict) {
                request.get(this.dictUrl + '?dict=' + this.widget.options.dict)
                    .then(data => {
                        this.options = data.data;
                        this.serValue(this.widget)
                    });
            }

            //复合选择框数据字典
            if (this.widget.type === 'compound' && this.widget.columns[0].options.remote && this.widget.columns[0].options.dict) {
                console.log(this.widget.columns[0].options.dict)
                request.get(this.dictUrl + '?dict=' + this.widget.columns[0].options.dict)
                    .then(data => {
                        this.options = data.data;
                        this.serValue(this.widget)
                    });
            }

            //级联数据字典
            if (this.widget.type === 'cascader') {
                //级联使用数据字典
                if (this.widget.options.remote && this.widget.options.dict) {
                    request.get(this.dictUrl + '?dict=' + this.widget.options.dict)
                        .then(data => {
                            data.data.forEach(item => {
                                item.children = []
                            });
                            //this.widget.options.remoteOptions = data.data;
                            this.cascaderData = data.data;
                            console.log(this.options)
                        });
                }

            }
        },
        methods: {
            //转换字典值
            dictValue(dict,value){
                if(!dict && !value && !(value === 0)){
                    return
                }
                else if(Array.isArray(value)){
                    let arr = [];
                    value.forEach(item =>{
                        dict.forEach(list=>{
                            if(item === list.code){
                                arr.push(list.name)
                            }
                        })
                    });
                    return String(arr)
                }
                else{
                    let str = '';
                    dict.forEach(item=>{
                        if(item.code === value){
                            str = item.name
                        }
                    });
                    return str
                }
            },
            //转换本地数据字典值
            optionsValue(dict,value){
                if(!dict && !value && !(value === 0)){
                    return '-'
                }
                else if(Array.isArray(value)){
                    let arr = [];
                    value.forEach(item =>{
                        dict.forEach(list=>{
                            if(item === list.value){
                                arr.push(list.label)
                            }
                        })
                    });
                    return String(arr)
                }
                else{
                    let str = '';
                    dict.forEach(item=>{
                        if(item.value === value){
                            str = item.label
                        }
                    });
                    return str
                }
            }

        }
    }
</script>
<style  lang="scss" scoped>
    .list{
        line-height: 3;
        margin: 0 -5px;
        display: flex;
    }
    .list .item{
        margin-left: -1px;
        margin-top: -1px;
        padding: 0 5px;
        flex-grow: 1;
    }
    .list .label{
        max-width: 100px;
        text-align: center;
    }


    .style2 .item{
        border: 1px solid #eee;
    }

    .style3{
        flex-wrap: wrap;
        flex-direction: column;
        margin-bottom: 10px;
    }
    .style3 .item{
        text-align: left;
    }
    .style3 .label{
        text-align: left;
        color: #9094A3;
    }

</style>
