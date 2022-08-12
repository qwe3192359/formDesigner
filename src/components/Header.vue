<template>
    <div class="head">
        <div class="title">表单设计器</div>
        <div>
            <div class="search">
                <el-select v-model="searchType" placeholder="请选择" style="width: 74px" class="select">
                    <el-option value="01" label="表单"></el-option>
                    <el-option value="02" label="列表"></el-option>
                </el-select>
                <el-select class="select2"
                           v-model="searchValue"
                           filterable
                           placeholder="搜索表单"
                           :filter-method="select"
                           @focus="searchFocus"
                           @change="searchChange">
                    <el-option
                            v-for="item in forms"
                            :key="item.code"
                            :label="item.name"
                            :value="item.code">
                        <span style="float: right">{{ item.name }}</span>
                        <span style="float: left; color: #8492a6; font-size: 13px">{{ item.code }}</span>
                    </el-option>
                </el-select>
            </div>

            <el-button type="primary" size="mini"  @click="newFile">新建</el-button>
            <el-button type="primary" size="mini"  @click="preview">预览</el-button>
            <el-button type="primary" size="mini"  @click="emitJson">生成JSON</el-button>
        </div>
    </div>

</template>

<script>
    import request from '../util/request.js'
    export default {
        props: {
            formDataUrl: {
                type: null,
                default: 'biz/formDesigner/source'
            },
            opt: {
                type: null,
                default: 'insert'
            },

        },
        computed: {},
        data () {
            return {
                //搜索表单类型，01表单，02列表
                searchType: '01',
                formArray: [],
                tableArray: [],
                searchArray: [],
                searchValue: '',
                forms: [],
            }
        },
        methods: {
            //搜索表单
            select(query){
                if (query !== '') {
                    this.forms = this.searchArray.filter(item => {
                        return item.code.toLowerCase()
                                .indexOf(query.toLowerCase()) > -1;
                    });
                }
                else {
                    this.forms = this.searchArray;
                }
            },
            //加载表单列表
            searchFocus(){
                this.searchValue = '';
                if (this.searchType === '01') {
                    request.get(this.formUrl + "?type=" + this.searchType).then(
                        res => {
                            this.formArray = res.data;
                            this.searchArray = this.formArray;
                            this.forms = this.formArray;
                        }
                    );
                }
                else if (this.searchType === '02') {
                    request.get(this.formUrl + "?type=" + this.searchType).then(
                        res => {
                            this.tableArray = res.data;
                            this.searchArray = this.tableArray;
                            this.forms = this.tableArray;
                        }
                    )
                }
            },
            //搜索框选项选中
            searchChange(value){
                this.$emit('searchChange', value, this.searchType)
            },
            //预览
            preview () {
                this.$emit('preview')
            },
            //生成json
            emitJson () {
                this.$emit('emitJson')
            },
            //新建
            newFile(){
                this.$emit('newFile')
            },
        }
    }
</script>

<style lang="scss" scoped>

    .head {
        height: 50px;
        padding: 0 10px;
        position: relative;
        border-bottom: 1px solid #ccd5db;
        display: flex;
        justify-content: space-between;
        align-items: center;
        background: #fafafa;

        .title {
            display: inline-block;
            line-height: 50px;
            vertical-align: middle;
            color: #1593ff;
            font-size: 20px;
            font-weight: 600;
            opacity: 0.8;
            margin-left: 6px;
        }
        .search {
            display: inline-block;
            margin-right: 10px;
        }
        .select /deep/ .el-input__inner {
            border-radius: 4px 0 0 4px;
        }
        .select2 /deep/ .el-input__inner {
            border-radius: 0 4px 4px 0;
            margin-left: -1px;
        }
    }
</style>
