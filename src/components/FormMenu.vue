<!--表单导航-->
<template>
    <el-main style="">
        <div class="form-menu-list" v-show="formType === '01'">
            <div class="title">表单组件</div>
            <vue-draggable class="box"
                       :list="basicFormConfig"
                       v-bind="getVueDraggableOptionsItem()"
            >
                <div v-for="(item, index) in basicFormConfig" class="list"
                    :key="'basic'+index">
                    <i class="iconfont" :class="item.icon"></i>
                    <span>{{item.names[language]}}</span>
                </div>
            </vue-draggable>

            <div class="title">复合组件</div>
            <vue-draggable class="box"
                       :list="compoundFormConfig"
                       v-bind="getVueDraggableOptionsItem()"
            >
                <div v-for="(item, index) in compoundFormConfig" class="list"
                    :key="'compound'+index">
                    <i class="iconfont" :class="item.icon"></i>
                    <span>{{item.names[language]}}</span>
                </div>
            </vue-draggable>

            <div class="title">容器组件</div>
            <vue-draggable class="box"
                       :list="layoutFormConfig"
                       v-bind="getVueDraggableOptionsGrid()"
            >
                <div v-for="(item, index) in layoutFormConfig" class="list"
                    :key="'grid'+index">
                    <i class="iconfont" :class="item.icon"></i>
                    <span>{{item.names[language]}}</span>
                </div>
            </vue-draggable>

        </div>
        <div class="form-menu-list" v-show="formType === '02'">
            <div class="title">列表字段</div>
            <div class="box">
                <div class="list">
                    <i class="iconfont" :class="tableConfig.icon"></i>
                    <span>{{tableConfig.names[language]}}</span>
                </div>
            </div>
        </div>
    </el-main>
</template>

<script>
    import VueDraggable from 'vuedraggable'
    import {
        basicFormConfig,
        layoutFormConfig,
        compoundFormConfig,
        tableConfig,
    } from '../form-config/formConfig.js'
    export default {
        name: 'form-menu',
        components: {
            VueDraggable
        },
        props: [
            'formType',
            'language'
        ],
        data () {
            return {
                basicFormConfig,
                layoutFormConfig,
                compoundFormConfig,
                tableConfig
            }
        },
        methods: {
            //生成Draggable插件的内容区域的配置
            getVueDraggableOptionsItem(){
                return {
                    group: {
                        name: 'item',
                        pull: 'clone',
                        put: false,
                        revertClone: false
                    },
                    sort: false,
                    animation: 300
                }
            },
            getVueDraggableOptionsGrid(){
                return {
                    group: {
                        name: 'grid',
                        pull: 'clone',
                        put: false,
                        revertClone: false
                    },
                    sort: false,
                    animation: 300
                }

            },
        }
    }
</script>

<style lang="scss" scoped>
    @import '../styles/index.scss';

    .form-menu-list {
        width: 100%;
        height: 100%;
        .title {
            padding: 10px 20px;
            font-size: 14px;
            color: #999;
        }
        .box {
            overflow: hidden;
            padding: 0;
            margin: 0;
            display: flex;
            flex-wrap: wrap;
            justify-content: space-between;
            align-items: center;
        }
        .list {
            padding: 4px 0;
            background: #fff;
            list-style: none;
            font-size: 12px;
            width: 48%;
            line-height: 26px;
            color: #333;
            border: 1px dashed #ccc;
            margin-bottom: 10px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            display: flex;
            align-items: center;
            &:hover {
                color: $primary-color;
                border-color: $primary-color;
                cursor: move;
            }
            .iconfont {
                font-size: 14px;
                padding: 0 8px;
            }
        }
    }

    .ghost{
        list-style: none;
        background: #000;
    }


</style>
