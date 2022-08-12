<!--设计显示区域子表单-->
<template>
    <el-form-item class=""
                  v-if="element && element.model"
                  :class="{active: formConfigSelect && formConfigSelect.model === element.model, 'required': element.options.validator && element.options.validator.required}"
                  :label="wrapType?'':element.names[language]"
                  @click.native.stop="selectForm"
                  style="margin-bottom: 2px;position: relative"
    >
        <template v-if="element.type === 'input'">
            <el-input
                    :type="element.options.fieldType"
                    v-model="element.options.defaults[language]"
                    :placeholder="element.options.placeholders[language]"
                    :style="{width: element.options.width}"
                    :readonly="element.options.readonly"
                    :disabled="element.options.isDisabled"
                    :clearable="element.options.clearable"
                    :suffix-icon="element.options.suffixIcon? element.options.suffixIcon+ ' iconfont':''"
                    :prefix-icon="element.options.prefixIcon? element.options.suffixIcon+ ' iconfont':''"
            >
                <template slot="append" v-if="element.options.units[language]">{{element.options.units[language]}}</template>
            </el-input>
        </template>

        <template v-if="element.type === 'textarea'">
            <el-input type="textarea"
                      v-model="element.options.defaults[language]"
                      :rows="4"
                      :style="{width: element.options.width}"
                      :placeholder="element.options.placeholders[language]"
                      :disabled="element.options.isDisabled"
                      :autosize="element.options.autosize"
            ></el-input>
        </template>

        <template v-if="element.type === 'select'">
            <el-select
                    v-model="element.options.defaultValue"
                    :disabled="element.options.isDisabled"
                    :multiple="element.options.multiple"
                    :clearable="element.options.clearable"
                    :placeholder="element.options.placeholders[language]"
                    :style="{width: element.options.width}"
            >
                <template >
                    <el-option v-for="(item,index) in element.options.options"
                               :key="element.model + index"
                               :value="item.value"
                               :label="item.label">
                    </el-option>
                </template>
            </el-select>
        </template>

        <template v-if="element.type === 'cascader'">
            <el-cascader
                    :options="[]"
                    v-model="element.options.defaultValue"
                    :disabled="element.options.disabled"
                    :placeholder="element.options.placeholders[language]"
                    :clearable="element.options.clearable"
                    :expand-trigger="element.options.trigger"
            >
            </el-cascader>
        </template>

        <template v-if="element.type === 'radio'">
            <el-radio-group v-model="element.options.defaultValue"
                            :disabled="element.options.disabled"
            >
                <el-radio
                        :style="{display: element.options.inline ? 'inline-block' : 'block'}"
                        v-for="(item, index) in (element.options.options)"
                        :label="item.value"
                        :key="element.model + index"
                >{{item.label}}
                </el-radio>
            </el-radio-group>
        </template>

        <template v-if="element.type === 'checkbox'">
            <el-checkbox-group v-model="element.options.defaultValue"
                               :disabled="element.options.disabled"
            >
                <el-checkbox
                        :style="{display: element.options.inline ? 'inline-block' : 'block'}"
                        v-for="(item, index) in (element.options.options)"
                        :label="item.value"
                        :key="element.model + index"
                >{{item.label}}
                </el-checkbox>
            </el-checkbox-group>
        </template>

        <template v-if="element.type === 'time'">
            <el-time-picker
                    v-model="element.options.defaultValue"
                    :is-range="element.options.range"
                    :placeholder="element.options.placeholders[language]"
                    :start-placeholder="element.options.startPlaceholders[language]"
                    :end-placeholder="element.options.endPlaceholders[language]"
                    :readonly="element.options.readonly"
                    :disabled="element.options.disabled"
                    :editable="element.options.editable"
                    :clearable="element.options.clearable"
                    :arrowControl="element.options.arrowControl"
                    :style="{width: element.options.width}"
            >
            </el-time-picker>
        </template>

        <template v-if="element.type === 'date'">
            <el-date-picker
                    v-model="element.options.defaultValue"
                    :type="element.options.dateType"
                    :is-range="element.options.isRange"
                    :placeholder="element.options.placeholders[language]"
                    :start-placeholder="element.options.startPlaceholders[language]"
                    :end-placeholder="element.options.endPlaceholders[language]"
                    :readonly="element.options.readonly"
                    :disabled="element.options.isDisabled"
                    :editable="element.options.editable"
                    :clearable="element.options.clearable"
                    :style="{width: element.options.width}"
            >
            </el-date-picker>
        </template>

        <template v-if="element.type === 'tree'">
            <el-tree
                    :data="element.options.options"
                    :props="element.options.props"
                    show-checkbox>
            </el-tree>
        </template>

        <template v-if="element.type === 'rate'">

            <el-rate v-model.number="element.options.defaultValue"
                     :max="element.options.max"
                     :disabled="element.options.disabled"
                     :allow-half="element.options.allowHalf"
        ></el-rate>
        </template>

        <template v-if="element.type === 'color'">
            <el-color-picker
                    v-model="element.options.defaultValue"
                    :disabled="element.options.disabled"
                    :show-alpha="element.options.showAlpha"
            ></el-color-picker>
        </template>

        <template v-if="element.type==='switch'">
            <el-switch
                    v-model="element.options.defaultValue"
                    :disabled="element.options.isDisabled"
            >
            </el-switch>
        </template>

        <template v-if="element.type==='slider'">
            <el-slider
                    v-model.number="element.options.defaultValue"
                    :min="element.options.min"
                    :max="element.options.max"
                    :disabled="element.options.disabled"
                    :step="element.options.step"
                    :show-input="element.options.showInput"
                    :range="element.options.range"
                    :style="{width: element.options.width}"
            ></el-slider>
        </template>

        <template v-if="element.type === 'number'">
            <el-input-number
                    v-model="element.options.defaultValue"
                    :controls-position="element.options.controlsPosition"
                    :style="{width: element.options.width}"
                    :disabled="element.options.isDisabled"
            ></el-input-number>
        </template>

        <el-button title="复制" @click.stop="cloneForm()" class="btn-clone"
                   v-if="formConfigSelect && formConfigSelect.model === element.model && !wrapType" circle plain type="primary">
            <i class="iconfont icon-fuzhi" style="width: 12px;height: 12px;padding: 0"></i>
        </el-button>
        <el-button title="删除" @click.stop="delForm()" class="btn-del"
                   v-if="formConfigSelect && formConfigSelect.model === element.model && !wrapType" circle plain type="danger">
            <i class="iconfont icon-shanchu" style="width: 12px;height: 12px;padding: 0"></i>
        </el-button>


    </el-form-item>
</template>

<script>
    import {deepClone,getType,getModel} from '../../util/common'
    export default {
        name: 'design-form-item',
        props: ['elements' , 'elementIndex' , 'element' , 'formConfigSelect' , 'wrapType' , 'language'],

        data () {
            return {

            }
        },
        created(){
            if(this.wrapType){
                console.log(this.names)
            }
            //改变特殊数据的默认数据类型
            if(this.element.type === 'rate' || this.element.type === 'slider'){
                this.element.options.defaultValue = Number(this.element.options.defaultValue)
            }
            else if(this.element.type === 'cascader'){
                this.element.options.defaultValue = [];
            }
        },
        methods: {
            //选中当前表单
            selectForm () {
                this.$emit('updateFormConfigSelect', this.element)

            },
            //删除表单
            delForm () {
                if (this.elements.length === 1) {
                    this.$emit('updateFormConfigSelect', null)

                } else if(this.elementIndex + 1 === this.elements.length){
                    this.$emit('updateFormConfigSelect', this.elements[this.elementIndex - 1])
                } else {
                    this.$emit('updateFormConfigSelect', this.elements[this.elementIndex + 1])
                }

                this.$nextTick(() => {
                    this.elements.splice(this.elementIndex, 1)
                })
            },
            //复制表单
            cloneForm () {
                let cloneData = this.deepClone(this.element);
                cloneData.model = getModel(cloneData.type);
                this.elements.splice(this.elementIndex + 1, 0, cloneData);
                this.$nextTick(() => {
                    this.$emit('updateFormConfigSelect', cloneData)
                })
            },
            //拷贝对象
            deepClone,
            //判断数据类型
            getType,
            getModel
        }
    }
</script>
<style lang="scss" scoped>
    .btn-del{
        position: absolute;
        right: 20px;
        bottom: -24px;
        z-index: 1009;
    }
    .btn-clone{
        position: absolute;
        right: 70px;
        bottom: -24px;
        z-index: 1009;
    }
    .required /deep/ label::before{
        content: "*";
        color: #f56c6c;
        margin-right: 4px;
    }
</style>
