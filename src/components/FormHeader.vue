<template>
    <div>
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
                               :filter-method="filterForm"
                               @focus="getFormListData"
                               @change="getFormData">
                        <el-option
                                v-for="item in forms"
                                :key="item.code"
                                :label="item.name[language]"
                                :value="item.code">
                            <span style="float: right">{{ item.name[language] }}</span>
                            <span style="float: left; color: #8492a6; font-size: 13px">{{ item.code }}</span>
                        </el-option>
                    </el-select>
                </div>

                <el-button type="primary" size="mini" @click="newForm">新建</el-button>
                <el-button type="primary" size="mini" @click="previewForm">预览</el-button>
                <el-button type="primary" size="mini" @click="generateJson">生成JSON</el-button>
            </div>
        </div>

        <!--预览-->
        <preview-form
                ref="preview"
                :language="language"
                :formConfig="formConfig"
        >
        </preview-form>

        <!--生成json-->
        <el-dialog
                v-if="isJsonBox"
                @on-close="isJsonBox = false"
                :visible.sync="isJsonBox"
                ref="jsonPreview"
                width="800px"
        >
            <div id="json" style="height: 400px;width: 100%;">{{formConfig}}</div>
            <div slot="footer">
                <el-button id="save" @click="saveForm">保存</el-button>
            </div>

        </el-dialog>

    </div>


</template>

<script>
    import request from '../util/request.js'
    import PreviewForm from '../pages/PreviewForm'

    export default {
        name: 'form-header',
        components: {
            PreviewForm
        },
        props: {
            api: null,
            opt: null,
            language: null,
            formConfig: null
        },
        computed: {},
        data() {
            return {
                //搜索表单类型，01表单，02列表
                searchType: '01',
                searchArray: [],
                searchValue: '',
                forms: [],

                //生成json
                isJsonBox: false,
            }
        },
        methods: {
            //搜索表单
            filterForm(query) {
                if (query !== '') {
                    this.forms = this.searchArray.filter(item => {
                        return item.code.toLowerCase()
                            .indexOf(query.toLowerCase()) > -1;
                    });
                } else {
                    this.forms = this.searchArray;
                }
            },
            //获取表单列表
            getFormListData() {
                this.searchValue = '';
                if (this.searchType === '01') {
                    request.get(this.api.formListUrl + "?type=" + this.searchType)
                        .then(res => {
                                this.forms = res.data;
                            }
                        );
                } else if (this.searchType === '02') {
                    request.get(this.api.formListUrl + "?type=" + this.searchType)
                        .then(res => {
                                this.forms = res.data;
                            }
                        )
                }
            },
            //搜索框选项选中,获取服务器上的表单数据
            getFormData(value) {
                this.$emit('getFormData', value, this.searchType)
            },

            //保存
            saveForm() {
                /*opt
                * insert 新增
                * update 修改
                * */
                request.post(this.api.formSave, {
                    type: this.formConfig.type,
                    id: this.formConfig.id,
                    opt: this.opt,
                    content: JSON.stringify(this.formConfig)
                }).then(
                    res => {
                        this.$message({
                            message: res.data.message,
                            type: 'success'
                        });
                    }
                );
            },

            //新建表单
            newForm() {
                this.$confirm('此操作将重置当前表单, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$emit('create')
                    this.$message({
                        type: 'success',
                        message: '新建表单成功!'
                    });
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '取消新建表单'
                    });
                });
            },
            //预览表单
            previewForm() {
                this.$refs.preview.open()
            },
            //生成json
            generateJson() {
                this.isJsonBox = true;
                this.$nextTick(() => {
                    const editor = ace.edit('json');
                    editor.session.setMode("ace/mode/json");
                })
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
