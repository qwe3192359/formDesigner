<!--表单字段属性-->
<template>
    <div v-if="formConfigSelect">
        <el-form label-position="top">
            <!--列表列设置-->
            <template v-if="formType==='02'">
                <el-form-item label="本列表头名称">
                    <language-config :options="formConfigSelect.names"></language-config>
                </el-form-item>
                <el-form-item label="数据绑定key">
                    <el-input v-model="formConfigSelect.model"></el-input>
                </el-form-item>
                <el-form-item label="列样式">
                    <el-input v-model="formConfigSelect.style"></el-input>
                </el-form-item>

                <el-form-item label="列类型">
                    <el-select v-model="formConfigSelect.type">
                        <el-option value="text" label="默认"></el-option>
                        <el-option value="link" label="链接"></el-option>
                        <el-option value="btn" label="事件"></el-option>
                        <el-option value="button" label="按钮组"></el-option>
                        <el-option value="dict" label="数据字典"></el-option>
                    </el-select>

                </el-form-item>

                <!--链接和数据字典-->
                <el-form-item label="链接地址" v-if="formConfigSelect.type === 'link'">
                    <el-input v-model="formConfigSelect.param"></el-input>
                </el-form-item>
                <el-form-item label="数据字典" v-if="formConfigSelect.type === 'dict'">
                    <el-input v-model="formConfigSelect.param"></el-input>
                </el-form-item>
                <el-form-item label="事件" v-if="formConfigSelect.type === 'btn'">
                    <el-input v-model="formConfigSelect.param"></el-input>
                </el-form-item>

                <!--按钮事件-->
                <el-form-item label="按钮配置" v-if="formConfigSelect.type === 'button'">

                    <div style="display: flex;padding: 5px 0;"
                         v-for="(item,index) in formConfigSelect.events"
                         :key="formConfigSelect.model + 'button' + index">
                        <el-input placeholder="绑定事件" v-model="item.buttonName" class="">
                            <el-select style="width: 100px" slot="prepend" v-model="item.buttonType" placeholder="按钮类型">
                                <el-option label="编辑" value="primary"></el-option>
                                <el-option label="新增" value="success"></el-option>
                                <el-option label="删除" value="danger"></el-option>
                            </el-select>
                        </el-input>
                        <el-button @click="delTableColumnEvent(index)" circle plain type="danger"
                                   size="mini" icon="el-icon-minus"
                                   style="margin-left: 5px;">
                        </el-button>
                    </div>
                    <div style="margin-left: 22px;">
                        <el-button type="text" @click="addTableColumnEvent">添加选项</el-button>
                    </div>
                </el-form-item>


                <el-form-item label="是否可以排序">
                    <el-switch v-model="formConfigSelect.sortable">
                    </el-switch>
                </el-form-item>

                <el-form-item label="本列是否固定">
                    <el-select v-model="formConfigSelect.fixed">
                        <el-option value="no" label="不固定"></el-option>
                        <el-option value="left" label="左侧固定"></el-option>
                        <el-option value="right" label="右侧固定"></el-option>
                    </el-select>

                </el-form-item>


                <el-form-item label="修改时的表单类型">
                    <el-select v-model="formConfigSelect.addType" @change="setAddType">
                        <el-option value="input" label="文本域"></el-option>
                        <el-option value="select" label="下拉选择框"></el-option>
                        <el-option value="radio" label="单选"></el-option>
                        <el-option value="checkbox" label="多选"></el-option>
                        <el-option value="time" label="时间"></el-option>
                        <el-option value="date" label="日期"></el-option>
                    </el-select>
                </el-form-item>


            </template>

            <!--栅格-->
            <template v-else-if="formConfigSelect.type === 'grid'">
                <el-form-item label="栅格间隔">
                    <el-input type="number" v-model.number="formConfigSelect.options.gutter"></el-input>
                </el-form-item>
                <el-form-item label="栅格单元格(24列)">
                    <vue-draggable element="ul"
                                   :list="formConfigSelect.columns"
                                   v-bind="getDraggableOptions()"
                    >
                        <li v-for="(item, index) in formConfigSelect.columns"
                            :key="formConfigSelect.model + 'columns' + index">
                            <i class="move-handle iconfont icon-liebiao-copy-copy-copy"
                               style="font-size: 16px;margin: 0 5px;cursor: move;">
                            </i>
                            <el-input-number v-model="item.span" :min="1" :max="24" size="mini"></el-input-number>
                            <el-button @click="deleteGridItem(index)" circle plain type="danger" size="mini"
                                       icon="el-icon-minus" style="padding: 4px;margin-left: 5px;"></el-button>
                        </li>
                    </vue-draggable>
                    <div style="margin-left: 22px;">
                        <el-button type="text" @click="addGridItem">添加单元格</el-button>
                    </div>
                </el-form-item>
                <el-form-item label="水平排列方式">
                    <el-select v-model="formConfigSelect.options.justify">
                        <el-option value="start" label="左对齐"></el-option>
                        <el-option value="end" label="右对齐"></el-option>
                        <el-option value="center" label="居中"></el-option>
                        <el-option value="space-around" label="两侧间隔相等"></el-option>
                        <el-option value="space-between" label="两端对齐"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="垂直排列方式">
                    <el-select v-model="formConfigSelect.options.align">
                        <el-option value="top" label="顶部对齐"></el-option>
                        <el-option value="middle" label="居中"></el-option>
                        <el-option value="bottom" label="底部对齐"></el-option>
                    </el-select>
                </el-form-item>
            </template>

            <!--表单元素公共-->
            <template v-else>
                <el-form-item label="表单标题"
                              v-if="formConfigSelect.hasOwnProperty('names') && !(formConfigSelect.type ==='select' && formConfigSelect.wrapType) "
                                class="item-box">
                    <language-config :options="formConfigSelect.names"></language-config>
                </el-form-item>

                <el-form-item label="操作属性">
                    <el-checkbox v-model="formConfigSelect.options.readonly"
                                 v-if="formConfigSelect.options.hasOwnProperty('readonly')">
                        <span>只读</span>
                    </el-checkbox>
                    <el-checkbox v-model="formConfigSelect.options.disabled"
                                 v-if="formConfigSelect.options.hasOwnProperty('disabled')">
                        <span>禁用</span>
                    </el-checkbox>
                    <el-checkbox v-model="formConfigSelect.options.clearable"
                                 v-if="formConfigSelect.options.hasOwnProperty('clearable')">
                        <span>显示清除按钮</span>
                    </el-checkbox>
                    <el-checkbox v-model="formConfigSelect.options.isPassword"
                                 v-if="formConfigSelect.options.hasOwnProperty('isPassword')">
                        <span>是否是密码框</span>
                    </el-checkbox>

                    <el-checkbox v-model="formConfigSelect.options.editable"
                                 v-if="formConfigSelect.options.hasOwnProperty('editable')">
                        <span>文本框可输入</span>
                    </el-checkbox>

                    <el-checkbox v-model="formConfigSelect.options.autosize"
                                 v-if="formConfigSelect.options.hasOwnProperty('autosize')">
                        <span>是否自动增高</span>
                    </el-checkbox>
                    <el-checkbox v-model="formConfigSelect.options.arrowControl"
                                 v-if="formConfigSelect.options.hasOwnProperty('arrowControl')">
                        <span>使用箭头进行时间选择</span>
                    </el-checkbox>
                    <el-checkbox v-model="formConfigSelect.options.showAllLevels"
                                 v-if="formConfigSelect.options.hasOwnProperty('showAllLevels')">
                        <span>是否显示完整路径</span>
                    </el-checkbox>
                    <el-checkbox v-model="formConfigSelect.options.checkStrictly"
                                 v-if="formConfigSelect.options.hasOwnProperty('checkStrictly')">
                        <span>是否可以选择任意一级</span>
                    </el-checkbox>
                    <el-checkbox v-model="formConfigSelect.options.multiple"
                                 @change="toggleSelectMuliple"
                                 v-if="formConfigSelect.options.hasOwnProperty('multiple')">
                        <span>是否多选</span>
                    </el-checkbox>
                    <el-checkbox v-model="formConfigSelect.options.range"
                                 v-if="formConfigSelect.options.hasOwnProperty('range')">
                        <span>是否为范围选择</span>
                    </el-checkbox>
                    <el-checkbox v-model="formConfigSelect.options.allowHalf"
                                 v-if="formConfigSelect.options.hasOwnProperty('allowHalf')">
                        <span>允许半选</span>
                    </el-checkbox>
                    <el-checkbox v-model="formConfigSelect.options.showAlpha"
                                 v-if="formConfigSelect.options.hasOwnProperty('showAlpha')">
                        <span>支持透明度选择</span>
                    </el-checkbox>

                    <el-checkbox v-model="formConfigSelect.options.showCheckbox"
                                 v-if="formConfigSelect.options.hasOwnProperty('showCheckbox')">
                        <span>节点是否可被选择</span>
                    </el-checkbox>
                    <el-checkbox v-model="formConfigSelect.options.defaultExpandAll"
                                 v-if="formConfigSelect.options.hasOwnProperty('defaultExpandAll')">
                        <span>是否默认展开所有节点</span>
                    </el-checkbox>
                    <el-checkbox v-model="formConfigSelect.options.accordion"
                                 v-if="formConfigSelect.options.hasOwnProperty('accordion')">
                        <span>是否每次只打开一个同级树节点展开</span>
                    </el-checkbox>

                </el-form-item>

                <el-form-item label="布局方式"
                              v-if="formConfigSelect.options.hasOwnProperty('inline')">
                    <el-radio-group v-model="formConfigSelect.options.inline">
                        <el-radio-button :label="false">块级</el-radio-button>
                        <el-radio-button :label="true">行内</el-radio-button>
                    </el-radio-group>
                </el-form-item>

                <template v-if="formConfigSelect.type === 'tree' || formConfigSelect.type === 'cascader'">
                    <el-form-item label="数据来源">
                        <el-radio-group v-model="formConfigSelect.options.dataSources" size="mini" style="margin-bottom:10px;">
                            <el-radio-button label="once">一次加载</el-radio-button>
                            <el-radio-button label="lazy">懒加载</el-radio-button>
                        </el-radio-group>
                        <el-input size="mini" style="" v-model="formConfigSelect.options.internet">
                            <template slot="prepend">请求链接</template>
                        </el-input>
                        <el-input size="mini" style="" v-model="formConfigSelect.options.value">
                            <template slot="prepend">标识</template>
                        </el-input>
                        <el-input size="mini" style="" v-model="formConfigSelect.options.label">
                            <template slot="prepend">名称</template>
                        </el-input>
                        <template v-if="formConfigSelect.options.dataSources === 'lazy'">
                            <el-input v-if="formConfigSelect.options.hasOwnProperty('cascaderUrlKey')"
                                      size="mini" style=""
                                      v-model="formConfigSelect.options.cascaderUrlKey">
                                <template slot="prepend">请求参数</template>
                            </el-input>
                            <el-input v-if="formConfigSelect.options.hasOwnProperty('cascaderUrlValue')"
                                      size="mini" style=""
                                      v-model="formConfigSelect.options.cascaderUrlValue">
                                <template slot="prepend">初始值值</template>
                            </el-input>
                        </template>
                    </el-form-item>
                </template>
                <template v-else>
                    <el-form-item label="数据来源"
                                  v-if="formConfigSelect.options.hasOwnProperty('dataSources')">
                        <el-radio-group v-model="formConfigSelect.options.dataSources"
                                        @change="resetDefaultValue"
                                        size="mini"
                                        style="margin-bottom:10px;display: flex;">
                            <el-radio-button label="local">本地数据</el-radio-button>
                            <el-radio-button label="dict">数据字典</el-radio-button>
                            <el-radio-button label="internet">远端数据</el-radio-button>
                        </el-radio-group>
                        <template v-if="formConfigSelect.options.dataSources === 'local'">
                            <!--单选、单选选择框-->
                            <template
                                    v-if="formConfigSelect.type==='radio' || (formConfigSelect.type === 'select' && !formConfigSelect.options.multiple)">
                                <el-radio-group v-model="formConfigSelect.options.defaultValue">
                                    <ul>
                                        <li v-for="(item, index) in formConfigSelect.options.options"
                                            :key="formConfigSelect.model+'options'+index"
                                            style="display: flex;padding: 5px 0;">
                                            <el-radio
                                                    :label="item.value"
                                                    style="margin-right: 5px;"
                                            >
                                                <el-input style="width:60px;" size="mini" v-model="item.value"></el-input>
                                                <el-input style="width: 90px" size="mini" v-model="item.label"></el-input>
                                            </el-radio>

                                            <el-button @click="deleteOptionsItem(index)" circle plain type="danger"
                                                       size="mini" icon="el-icon-minus"
                                                       style=""></el-button>
                                        </li>
                                    </ul>
                                </el-radio-group>
                            </template>
                            <!--多选、多选选择框-->
                            <template
                                    v-if="formConfigSelect.type === 'checkbox' || (formConfigSelect.type === 'select' && formConfigSelect.options.multiple)">
                                <el-checkbox-group v-model="formConfigSelect.options.defaultValue">

                                    <ul>
                                        <li v-for="(item, index) in formConfigSelect.options.options"
                                            :key="formConfigSelect.model+'options'+index"
                                            style="display: flex;padding: 5px 0;">
                                            <el-checkbox
                                                    :label="item.value"
                                                    style="margin-right: 5px;"
                                            >
                                                <el-input style="width: 60px" size="mini" v-model="item.value"></el-input>
                                                <el-input style="width: 90px;" size="mini" v-model="item.label"></el-input>
                                            </el-checkbox>
                                            <el-button @click="deleteOptionsItem(index)" circle plain type="danger"
                                                       size="mini" icon="el-icon-minus"
                                                       style=""></el-button>

                                        </li>
                                    </ul>
                                </el-checkbox-group>
                            </template>
                            <div style="margin-left: 22px;">
                                <el-button type="text" @click="addOptionsItem">添加选项</el-button>
                            </div>
                        </template>
                        <template v-else-if="formConfigSelect.options.dataSources === 'dict'">
                            <el-input size="mini" style="" v-model="formConfigSelect.options.dict">
                                <template slot="prepend">数据字典</template>
                            </el-input>

                        </template>
                        <template v-else-if="formConfigSelect.options.dataSources === 'internet'">
                            <el-input size="mini" style="" v-model="formConfigSelect.options.internet">
                                <template slot="prepend">请求链接</template>
                            </el-input>
                            <el-input size="mini" style="" v-model="formConfigSelect.options.value">
                                <template slot="prepend">标识</template>
                            </el-input>
                            <el-input size="mini" style="" v-model="formConfigSelect.options.label">
                                <template slot="prepend">名称</template>
                            </el-input>
                        </template>
                    </el-form-item>
                </template>



                <el-form-item label="默认值"
                              class="item-box"
                              v-if="formConfigSelect.type!=='select'&& formConfigSelect.type!=='cascader'&& formConfigSelect.type!=='radio'&& formConfigSelect.type !== 'checkbox'
                              && formConfigSelect.type!=='time'&&formConfigSelect.type!=='date' && formConfigSelect.type!== 'slider' && formConfigSelect.type!== 'tree'">

                    <language-config v-if="formConfigSelect.type === 'input'"
                                     :options="formConfigSelect.options.defaults">
                    </language-config>

                    <language-config v-if="formConfigSelect.type === 'textarea'"
                                     :options="formConfigSelect.options.defaults">
                    </language-config>


                    <el-input v-if="formConfigSelect.type === 'number' "
                              v-model.number="formConfigSelect.options.defaultValue">

                    </el-input>
                    <el-rate v-if="formConfigSelect.type === 'rate'" style="display:inline-block;vertical-align: middle;"
                             :max="formConfigSelect.options.max" :allow-half="formConfigSelect.options.allowHalf"
                             v-model="formConfigSelect.options.defaultValue">

                    </el-rate>
                    <el-button type="text" v-if="formConfigSelect.type === 'rate'"
                               style="display:inline-block;vertical-align: middle;margin-left: 10px;"
                               @click="formConfigSelect.options.defaultValue=0">
                        <span>清空</span>
                    </el-button>
                    <el-color-picker
                            v-if="formConfigSelect.type === 'color'"
                            v-model="formConfigSelect.options.defaultValue"
                            :show-alpha="formConfigSelect.options.showAlpha"
                    ></el-color-picker>
                    <el-switch v-if="formConfigSelect.type === 'switch'"
                               v-model="formConfigSelect.options.defaultValue"></el-switch>
                </el-form-item>

                <el-form-item label="占位内容"
                              class="item-box"
                              v-if="formConfigSelect.options.hasOwnProperty('placeholders') && (formConfigSelect.type !== 'time' && formConfigSelect.type !== 'date')">
                    <language-config :options="formConfigSelect.options.placeholders">
                    </language-config>
                </el-form-item>

                <el-form-item label="级联最大层" v-if="formConfigSelect.options.hasOwnProperty('maxLevel')">
                    <el-input v-model="formConfigSelect.options.maxLevel"></el-input>
                </el-form-item>
                <el-form-item label="菜单展开方式" v-if="formConfigSelect.options.hasOwnProperty('trigger')">
                    <el-select v-if="formConfigSelect.options.hasOwnProperty('trigger')"
                               v-model="formConfigSelect.options.trigger">
                        <el-option value="click" label="点击"></el-option>
                        <el-option value="hover" label="悬浮"></el-option>
                    </el-select>
                </el-form-item>

                <template v-if="formConfigSelect.type === 'time' || formConfigSelect.type === 'date'">
                    <el-form-item label="显示类型" v-if="formConfigSelect.type === 'date'">
                        <el-select v-model="formConfigSelect.options.dateType">
                            <el-option value="year" label="年"></el-option>
                            <el-option value="month" label="月"></el-option>
                            <el-option value="date" label="日"></el-option>
                            <el-option value="week" label="周"></el-option>
                            <el-option value="dates" label="多个日期"></el-option>
                            <el-option value="daterange" label="日期区间"></el-option>

                            <el-option value="datetime" label="日期+时间"></el-option>
                            <el-option value="datetimerange" label="日期+时间区间"></el-option>
                            <el-option value="monthrange" label="月份区间"></el-option>
                        </el-select>
                    </el-form-item>
                    <template v-if="(!formConfigSelect.options.range && formConfigSelect.type === 'time') ||
                                  (formConfigSelect.type === 'date' && formConfigSelect.options.dateType !== 'daterange' && formConfigSelect.options.dateType !== 'datetimerange')&& formConfigSelect.options.dateType !== 'monthrange' ">
                        <el-form-item label="占位内容"
                                      class="item-box"
                        >
                            <language-config :options="formConfigSelect.options.placeholders">
                            </language-config>
                        </el-form-item>
                    </template>
                    <template v-else>
                        <el-form-item label="开始时间占位内容" class="item-box">
                            <language-config :options="formConfigSelect.options.startPlaceholders">
                            </language-config>
                        </el-form-item>
                        <el-form-item label="结束时间占位内容" class="item-box">
                            <language-config :options="formConfigSelect.options.endPlaceholders">
                            </language-config>
                        </el-form-item>
                    </template>


                    <el-form-item label="默认值"
                                  v-if="formConfigSelect.type === 'time' && formConfigSelect.options.hasOwnProperty('range')">
                        <el-time-picker
                                key="1"
                                style="width: 100%;"
                                v-if="!formConfigSelect.options.range"
                                v-model="formConfigSelect.options.defaultValue"
                                :arrowControl="formConfigSelect.options.arrowControl"
                                :value-format="formConfigSelect.options.format"
                        >
                        </el-time-picker>
                        <el-time-picker
                                key="2"
                                v-if="formConfigSelect.options.range"
                                style="width: 100%;"
                                v-model="formConfigSelect.options.defaultValue"
                                is-range
                                :arrowControl="formConfigSelect.options.arrowControl"
                                :value-format="formConfigSelect.options.format"
                        >
                        </el-time-picker>
                    </el-form-item>
                </template>


                <el-form-item label="最小值" v-if="formConfigSelect.options.hasOwnProperty('min')">
                    <el-input-number v-model="formConfigSelect.options.min" :min="0" :max="100"
                                     :step="1"></el-input-number>
                </el-form-item>
                <el-form-item label="最大值" v-if="formConfigSelect.options.hasOwnProperty('max')">
                    <el-input-number v-model="formConfigSelect.options.max" :min="0" :max="100"
                                     :step="1"></el-input-number>
                </el-form-item>
                <el-form-item label="步长" v-if="formConfigSelect.options.hasOwnProperty('step')">
                    <el-input-number v-model="formConfigSelect.options.step" :min="0" :max="100"
                                     :step="1"></el-input-number>
                </el-form-item>


                <el-form-item label="字段Key">
                    <el-input v-model="formConfigSelect.model"></el-input>
                </el-form-item>




                <el-form-item label="事件配置" v-if="formConfigSelect.options.hasOwnProperty('events')">
                    <template v-for="(item,index) in formConfigSelect.options.events">
                        <div style="display: flex;padding: 5px 0" :key="formConfigSelect.model+'events'+index">
                            <el-input placeholder="请输入事件名称" v-model="item.name" class=""
                            >
                                <el-select style="width: 100px" slot="prepend" v-model="item.type" placeholder="请选择事件">
                                    <el-option label="单击事件" value="click"></el-option>
                                    <el-option label="双击事件" value="dblclick"></el-option>
                                    <el-option label="获得焦点" value="focus"></el-option>
                                    <el-option label="失去焦点" value="blur"></el-option>
                                    <el-option label="值变化" value="change"></el-option>
                                </el-select>
                            </el-input>
                            <el-button @click="delEvent(index)" circle plain type="danger"
                                       size="mini" icon="el-icon-minus" :key="formConfigSelect.model+'del'+index"
                                       style="margin-left: 5px;">
                            </el-button>
                        </div>
                    </template>
                    <div style="margin-left: 22px;">
                        <el-button type="text" @click="addEvent">添加事件</el-button>
                    </div>
                </el-form-item>

                <el-form-item label="关联数据key">
                    <el-input v-model="formConfigSelect.options.bindKey"></el-input>
                </el-form-item>
                <el-form-item label="关联数据条件判定（true显示）">
                    <el-input v-model="formConfigSelect.options.bindFun"></el-input>
                </el-form-item>

                <!--表单检验-->
                <template v-if="formConfigSelect.options.hasOwnProperty('validator')">
                    <el-form-item label="校验">
                        <template v-if="formConfigSelect.options.validator.hasOwnProperty('required')">
                            <el-checkbox v-model="formConfigSelect.options.validator.required">必填</el-checkbox>
                        </template>
                    </el-form-item>

                    <el-form-item label="字段检验类型"
                                  v-if="formConfigSelect.options.validator.hasOwnProperty('dataType')">
                        <el-select v-model="formConfigSelect.options.validator.dataType">
                            <el-option value="text" label="文本"></el-option>
                            <el-option value="number" label="数字"></el-option>
                            <el-option value="url" label="URL地址"></el-option>
                            <el-option value="email" label="邮箱地址"></el-option>
                            <el-option value="phoneNo" label="手机号"></el-option>
                            <el-option value="tel" label="固定电话"></el-option>
                        </el-select>
                    </el-form-item>

                    <template v-if="formConfigSelect.options.validator.hasOwnProperty('min')">
                        <el-form-item label="字段最小值">
                            <el-input-number v-model="formConfigSelect.options.validator.min"
                                             :step="1">
                            </el-input-number>
                        </el-form-item>
                        <el-form-item label="字段最大值">
                            <el-input-number v-model="formConfigSelect.options.validator.max"
                                             :step="1">
                            </el-input-number>
                        </el-form-item>
                    </template>
                </template>

                <el-form-item label="标题样式" v-if="formConfigSelect.options.hasOwnProperty('labelStyle')">
                    <el-input v-model="formConfigSelect.options.labelStyle"></el-input>
                </el-form-item>
                <el-form-item label="字段样式" v-if="formConfigSelect.options.hasOwnProperty('fieldStyle')">
                    <el-input v-model="formConfigSelect.options.fieldStyle"></el-input>
                </el-form-item>
                <el-form-item label="字段类型" v-if="formConfigSelect.options.hasOwnProperty('fieldType') ">
                    <el-select v-if="formConfigSelect.options.hasOwnProperty('fieldType')"
                               v-model="formConfigSelect.options.fieldType">
                        <el-option value="text" label="文本"></el-option>
                        <el-option value="password" label="密码"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="单位"
                              class="item-box"
                              v-if="formConfigSelect.options.hasOwnProperty('units') && !(formConfigSelect.type ==='input' && formConfigSelect.wrapType)">
                    <language-config :options="formConfigSelect.options.units">
                    </language-config>
                </el-form-item>

                <el-form-item label="后置图标"
                              v-if="formConfigSelect.options.hasOwnProperty('suffixIcon') && !(formConfigSelect.type ==='input' && formConfigSelect.wrapType)">
                    <el-input @focus="selectIconfont('suffixIcon')"
                              v-model="formConfigSelect.options.suffixIcon"></el-input>
                </el-form-item>
                <el-form-item label="前置图标"
                              v-if="formConfigSelect.options.hasOwnProperty('prefixIcon') && !(formConfigSelect.type ==='input' && formConfigSelect.wrapType)">
                    <el-input @focus="selectIconfont('prefixIcon')"
                              v-model="formConfigSelect.options.prefixIcon"></el-input>
                </el-form-item>
                <icon-font :isIconfont.sync="isIconfont"
                           :iconfontType="iconfontType"
                           :suffixIcon.sync="formConfigSelect.options.suffixIcon"
                           :prefixIcon.sync="formConfigSelect.options.prefixIcon">

                </icon-font>
            </template>

        </el-form>
    </div>
</template>

<script>
    import {basicFormConfig} from '../../form-config/formConfig.js'
    import VueDraggable from 'vuedraggable'
    import LanguageConfig from '../common/LanguageConfig'
    import IconFont from '../common/IconFont'

    export default {
        name: 'form-item-options',
        components: {
            VueDraggable,
            LanguageConfig,
            IconFont,
        },
        props: ['formConfigSelect', 'formType'],
        data() {
            return {
                //图标
                isIconfont: false,
                iconfontType: ''
            }
        },
        computed: {
            //排序
            sortable() {
                if (this.formConfigSelect.sortable) {
                    return 'custom'
                } else {
                    return false
                }
            }
        },
        methods: {
            //生成Draggable插件的配置
            getDraggableOptions() {
                return {group: {name: 'options'}, ghostClass: 'ghost', handle: '.move-handle'}
            },
            //重置默认值
            resetDefaultValue(){
                this.formConfigSelect.options.defaultValue = ''

            },

            //删除栅格列
            deleteGridItem(index) {
                this.formConfigSelect.columns.splice(index, 1)
            },
            //删除静态数据项
            deleteOptionsItem(index) {
                this.formConfigSelect.options.options.splice(index, 1)
            },
            //添加栅格列
            addGridItem() {
                this.formConfigSelect.columns.push({
                    span: '',
                    elements: []
                })
            },
            //增加静态数据项
            addOptionsItem() {
                this.formConfigSelect.options.options.push({
                    value: this.formConfigSelect.options.options.length + 1,
                    label: '新选项'
                })
            },
            //增加事件
            addEvent() {
                this.formConfigSelect.options.events.push({
                    type: '',
                    name: ''
                })
            },
            //删除单行事件
            delEvent(index) {
                this.formConfigSelect.options.events.splice(index, 1)
            },

            //增加表格-列按钮的事件
            addTableColumnEvent() {
                this.formConfigSelect.events.push({
                    buttonName: '',
                    buttonType: ''
                })
            },
            //删除表格-列按钮的事件
            delTableColumnEvent(index) {
                this.formConfigSelect.events.splice(index, 1)
            },
            //单选多选切换改变默认值
            toggleSelectMuliple(value) {
                console.log(value)
                if (value) {
                    if (this.formConfigSelect.options.defaultValue) {
                        this.formConfigSelect.options.defaultValue = [this.formConfigSelect.options.defaultValue]
                    } else {
                        this.formConfigSelect.options.defaultValue = []
                    }

                } else {
                    if (this.formConfigSelect.options.defaultValue.length > 0) {
                        this.formConfigSelect.options.defaultValue = this.formConfigSelect.options.defaultValue[0]
                    } else {
                        this.formConfigSelect.options.defaultValue = ''
                    }

                }
            },
            //切换表格的新增表单类型
            setAddType(value) {
                console.log(value)
                basicFormConfig.forEach((item) => {
                    if (value === item.type) {
                        this.formConfigSelect.addTypeoptions = item
                        this.formConfigSelect.addTypeoptions.model = Date.now() + '_' + Math.ceil(Math.random() * 99999);
                    }

                })
                console.log(this.formConfigSelect)

            },

            //选择图标
            selectIconfont(value) {
                this.isIconfont = true;
                this.iconfontType = value;
            }
        }

    }
</script>
<style lang="scss" scoped>
    @import '../../styles/index';

    .ghost {
        background: #fff;
        outline: 1px dashed $primary-color;
    }

    ul {
        margin: 0;
        padding: 0;
    }

    li {
        list-style: none;
    }
    .item-box{
        display: flex;
        margin-bottom: 0 !important;
    }


</style>
