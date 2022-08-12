<template>
    <div>
        <el-button style="margin-left: 20px" type="text" @click="dialogVisible = true">点击设置</el-button>
        <el-dialog
                title="国际化设置"
                :visible.sync="dialogVisible"
                width="30%">
            <el-input placeholder="请输入中文名称" v-model="options['zh_CN']" style="margin-bottom: 10px;">
                <template slot="prepend">中文</template>
            </el-input>
            <el-input placeholder="請輸入繁體名稱" v-model="options['zh_HK']" style="margin-bottom: 10px;">
                <template slot="prepend">繁體</template>
            </el-input>
            <el-input placeholder="Please enter English name" v-model="options['en_US']" style="margin-bottom: 10px;">
                <template slot="prepend">English</template>
            </el-input>
            <span slot="footer" class="dialog-footer">
                        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
                      </span>
        </el-dialog>
    </div>
</template>

<script>
    export default {
        name: 'language-config',
        props: ['options'],
        data () {
            return {
                dialogVisible: false
            }
        },
        methods: {

        }
    }
</script>