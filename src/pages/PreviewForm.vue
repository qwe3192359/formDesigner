<template>
    <el-dialog
            :visible.sync="previewVisible"
            v-if="previewVisible"
            center
            width="1000px"
    >
        <div>
            <generate-form
                    ref="generateForm"
                    :formConfig="formConfig"
                    :formData="formData"

                    :formShowType="formShowType"
                    :formStyle="formStyle"
                    :language="previewLanguage"

                    :tableData="tableData"
                    @myEvent="myEvent"
                    @data-change="dataChange">
            </generate-form>
        </div>

        <div slot="footer">
            <el-select class="list"
                       placeholder="请选择"
                       v-model="previewLanguage">
                <el-option
                        label="简体中文"
                        value="zh_CN">
                </el-option>
                <el-option
                        label="繁体中文"
                        value="zh_HK">
                </el-option>
                <el-option
                        label="英语"
                        value="en_US">
                </el-option>
            </el-select>
            <el-select class="list"
                       placeholder="请选择"
                       v-model="formShowType">
                <el-option
                        label="表单"
                        value="form">
                </el-option>
                <el-option
                        label="文字"
                        value="text">
                </el-option>
            </el-select>
            <el-select class="list"
                       placeholder="请选择"
                       v-model="formStyle">
                <el-option
                        label="样式1"
                        value="style1">
                </el-option>
                <el-option
                        label="样式2"
                        value="style2">
                </el-option>
                <el-option
                        label="样式3"
                        value="style3">
                </el-option>
            </el-select>
            <el-button @click="updateFormData">更新数据</el-button>
            <el-button @click="reset">重置</el-button>
            <el-button @click="clearValidate">移除表单检验结果</el-button>
            <el-button @click="close">取消</el-button>
            <el-button type="primary" @click="submit">确 定</el-button>
        </div>
    </el-dialog>
</template>

<script>
    import request from '../util/request'
    import GenerateForm from '../components/generate/GenerateForm'
    export default {
        name:'preview-form',
        components: {
            GenerateForm
        },
        props: {
            formConfig: null,
            language: null
        },
        data () {
            return {
                previewVisible: false,
                formShowType: 'form',
                formStyle: 'style1',

                //预览模拟数据
                formData: {name: '111'},
                tableData: null,
                previewLanguage: this.language
            }
        },
        created(){
            request.get('/biz/system/table')
                .then(data => {
                    this.tableData = data.data;
                });
        },
        methods: {
            //打开弹出框
            open(){
                this.previewVisible = true;
            },
            //关闭弹出框
            close () {
                this.previewVisible = false;
            },
            //更新表单数据
            updateFormData(){
                this.formData = {name: '222'}
            },
            //提交数据
            submit () {
                this.$refs.generateForm.getData().then(data => {
                    console.log(data)
                    this.$alert(data, {})
                }).catch(e => {

                })
            },
            //重置
            reset(){
                this.$refs.generateForm.resetFields()
            },
            //清除表单验证结果
            clearValidate(){
                this.$refs.generateForm.clearValidate()
            },

            //事件触发
            myEvent(eventName, option){
                console.log(eventName);
                console.log(option)
            },
            //监听分页变化,预览使用
            dataChange(type, val){
                console.log(type);
                console.log(val);
            },
        }
    }
</script>

<style lang="scss" scoped>
    .list {
        width: 100px;
        margin-right: 10px;
    }
</style>
