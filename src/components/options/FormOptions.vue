<!--表单配置-->
<template>
    <div>
        <el-form label-position="top">
            <el-form-item label="表单标题">
                <language-config :options="formConfig.names"></language-config>
            </el-form-item>
            <el-form-item label="表单ID">
                <el-input placeholder="请输入表单ID" v-model="formConfig.id" :disabled="opt==='update'">
                </el-input>
            </el-form-item>
            <el-form-item label="标签对齐方式" v-if="formConfig.type === '01'">
                <el-radio-group v-model="formConfig.labelPosition">
                    <el-radio-button label="left">左对齐</el-radio-button>
                    <el-radio-button label="right">右对齐</el-radio-button>
                    <el-radio-button label="top">顶部对齐</el-radio-button>
                </el-radio-group>
            </el-form-item>

            <template v-if="formConfig.type==='02'">

                <el-form-item label="列表属性">
                    <el-checkbox v-model="formConfig.head.stripe">是否有斑马纹</el-checkbox>
                    <el-checkbox v-model="formConfig.head.border">是否有边框</el-checkbox>
                    <el-checkbox v-model="formConfig.head.isSelect">行是否可选</el-checkbox>
                </el-form-item>

                <el-form-item label="树形数据key">
                    <el-input v-model="formConfig.head.rowKey"></el-input>
                </el-form-item>

                <el-form-item label="可筛选元素">
                    <el-select v-model="formConfig.head.filters" multiple>
                        <el-option
                                v-for="(item,index) in tableColumn"
                                :key="item.model+'filters'+index"
                                :label="item.names.cns"
                                :value="item.model">
                        </el-option>
                    </el-select>

                </el-form-item>

                <el-form-item label="数据加载方式">
                    <el-select v-model="formConfig.head.loadType">
                        <el-option value="01" label="全部加载"></el-option>
                        <el-option value="02" label="滚动加载"></el-option>
                        <el-option value="03" label="分页加载"></el-option>
                    </el-select>
                </el-form-item>

                <el-form-item label="最大高度" v-if="formConfig.head.loadType !== '01'">
                    <el-input v-model="formConfig.head.height"></el-input>
                </el-form-item>


                <el-form-item label="是否有分页">
                    <el-switch
                            v-model="formConfig.head.pageConfig.paging">
                    </el-switch>
                </el-form-item>
                <template v-if="formConfig.head.pageConfig.paging">

                    <el-form-item label="分页类型">
                        <el-select v-model="formConfig.head.pageConfig.layout" >
                            <el-option value="01" label="基础分页"></el-option>
                            <el-option value="02" label="完整功能"></el-option>
                            <el-option value="03" label="只显示统计数据"></el-option>
                        </el-select>
                    </el-form-item>

                    <el-form-item label="分页属性">
                        <el-checkbox v-model="formConfig.head.pageConfig.background">是否有背景</el-checkbox>
                    </el-form-item>
                </template>

            </template>
        </el-form>
    </div>
</template>

<script>
    import LanguageConfig from '../common/LanguageConfig'
    export default {
        name: 'form-options',
        components: {
            'language-config': LanguageConfig
        },
        props: ['formConfig', 'opt',  'tableColumn']
    }
</script>
