/**
 * Created by yy on 2019/6/21.
 */
import Mock from 'mockjs';
//Mock.Random 是一个工具类，用于生成各种随机数据

//处理请求参数
function getUrlParam(data) {
    console.log(data)
    let param = {};
    let url = data.url;
    if(url){
        url = url.split('?')[1];
        url = url.split('&');
        url.forEach(item => {
            param[item.split('=')[0]] = item.split('=')[1]
        });
    }

    return param
}

//获取表单列表
function getFormList(data) {
    return Mock.mock({
        status: 'success',
        'data|1-6': [{
            'code|+1': ['1','2','3','4','5','6'],
            'name': {
                zh_CN: '@cword(3, 5)',
                zh_HK: '@cword(3, 5)',
                en_US: '@cword(3, 5)'
            }
        }]
    });
}

//获取表单配置数据
function getFormConfig() {

}
//生成表单配置数据
function getFormConfigData(data) {

    let param = getUrlParam(data);
    console.log(param);
    if (param.type === '01') {
        //返回表单数据
        if(param.id === 'yy-1'){
            return Mock.mock({
                status: 'success',
                data: {
                    "grids": [
                        {
                            "type": "grid",
                            "names": {
                                "zh_CN": "栅格布局",
                                "zh_HK": "栅格布局",
                                "en_US": "栅格布局"
                            },
                            "model": '@id',
                            "columns": [
                                {
                                    "span": 12,
                                    "elements": [
                                        {
                                            "type": "input",
                                            "names": {
                                                "zh_CN": "姓名",
                                                "zh_HK": "姓名",
                                                "en_US": "name"
                                            },
                                            "options": {
                                                "labelStyle": "",
                                                "fieldStyle": "",
                                                "fieldType": "text",
                                                "defaults": {
                                                    "zh_CN": '',
                                                    "zh_HK": '',
                                                    "en_US": ''
                                                },
                                                "placeholders": {
                                                    "zh_CN": "请输入姓名",
                                                    "zh_HK": "",
                                                    "en_US": ""
                                                },
                                                "units": {
                                                    "zh_CN": "",
                                                    "zh_HK": "",
                                                    "en_US": ""
                                                },
                                                "readonly": false,
                                                "disabled": false,
                                                "clearable": true,
                                                "suffixIcon": "",
                                                "prefixIcon": "",
                                                "bindKey": "",
                                                "bindFun": "",
                                                "validator": {
                                                    "required": false,
                                                    "dataType": "text",
                                                    "min": 1,
                                                    "max": 10
                                                },
                                                "events": []
                                            },
                                            "model": '@id'
                                        },
                                    ]
                                },
                                {
                                    "span": 12,
                                    "elements": [
                                        {
                                            "type": "textarea",
                                            "names": {
                                                "zh_CN": "个人简介",
                                                "zh_HK": "多行文本",
                                                "en_US": "JTextArea"
                                            },
                                            "model": "@id",
                                            "options": {
                                                "labelStyle": "",
                                                "fieldStyle": "",
                                                "defaults": {
                                                    'zh_CN': '@word',
                                                    'zh_HK': '',
                                                    'en_US': ''
                                                },
                                                "placeholders": {
                                                    "zh_CN": "单行文本",
                                                    "zh_HK": "",
                                                    "en_US": ""
                                                },
                                                "readonly": false,
                                                "disabled": false,
                                                "autosize": true,
                                                "bindKey": "",
                                                "bindFun": "",
                                                "validator": {
                                                    "required": false,
                                                    "dataType": "text",
                                                    "pattern": "",
                                                    "min": 1,
                                                    "max": 10
                                                }
                                            }
                                        },
                                    ]
                                }
                            ],
                            "options": {
                                "gutter": 10,
                                "justify": "start",
                                "align": "top"
                            }
                        },
                        {
                            "type": "grid",
                            "names": {
                                "zh_CN": "栅格布局",
                                "zh_HK": "栅格布局",
                                "en_US": "栅格布局"
                            },
                            "model": '@id',
                            "columns": [
                                {
                                    "span": 12,
                                    "elements": [
                                        {
                                            "type": "select",
                                            "names": {
                                                "zh_CN": "下拉选择框",
                                                "zh_HK": "下拉選擇框",
                                                "en_US": "select"
                                            },
                                            "options": {
                                                "labelStyle": "",
                                                "fieldStyle": "",
                                                "defaultValue": "",
                                                "multiple": false,
                                                "clearable": false,
                                                "placeholders": {
                                                    "zh_CN": "请选择",
                                                    "zh_HK": "",
                                                    "en_US": ""
                                                },
                                                "options": [],
                                                "remote": true,
                                                "dict": "sex",
                                                "disabled": false,
                                                "validator": {
                                                    "required": false
                                                },
                                                "bindKey": "",
                                                "bindFun": "",
                                                "events": []
                                            },
                                            "model": "@id"
                                        },
                                    ]
                                },
                                {
                                    "span": 12,
                                    "elements": [
                                        {
                                            "type": "cascader",
                                            "names": {
                                                "zh_CN": "级联选择器",
                                                "zh_HK": "級聯選擇器",
                                                "en_US": "cascader"
                                            },
                                            "model": "@id",
                                            "options": {
                                                "labelStyle": "",
                                                "fieldStyle": "",
                                                "defaultValue": [],
                                                "disabled": false,
                                                "clearable": false,
                                                "placeholders": {
                                                    "zh_CN": "单行文本",
                                                    "zh_HK": "",
                                                    "en_US": ""
                                                },
                                                "showAllLevels": false,
                                                "checkStrictly": false,
                                                "maxLevel": 3,
                                                "trigger": "hover",
                                                "remote": true,
                                                "dict": "PROVINCE",
                                                "cascaderUrl": "",
                                                "cascaderUrlKey": "",
                                                "cascaderUrlValue": "",
                                                "validator": {
                                                    "required": false
                                                },
                                                "bindKey": "",
                                                "bindFun": "",
                                                "events": []
                                            }
                                        },
                                    ]
                                }
                            ],
                            "options": {
                                "gutter": 10,
                                "justify": "start",
                                "align": "top"
                            }
                        },
                        {
                            "type": "grid",
                            "names": {
                                "zh_CN": "栅格布局",
                                "zh_HK": "栅格布局",
                                "en_US": "栅格布局"
                            },
                            "model": '@id',
                            "columns": [
                                {
                                    "span": 12,
                                    "elements": [
                                        {
                                            "type": "radio",
                                            "names": {
                                                "zh_CN": "学历",
                                                "zh_HK": "單選框組",
                                                "en_US": "radio"
                                            },
                                            "model": "@id",
                                            "options": {
                                                "labelStyle": "",
                                                "fieldStyle": "",
                                                "inline": false,
                                                "defaultValue": "",
                                                "remote": true,
                                                "options": [],
                                                "dict": "edu",
                                                "disabled": false,
                                                "validator": {
                                                    "required": false
                                                },
                                                "bindKey": "",
                                                "bindFun": "",
                                                "events": []
                                            }
                                        },
                                    ]
                                },
                                {
                                    "span": 12,
                                    "elements": [
                                        {
                                            "type": "checkbox",
                                            "names": {
                                                "zh_CN": "角色",
                                                "zh_HK": "多選框組",
                                                "en_US": "checkbox"
                                            },
                                            "model": "@id",
                                            "options": {
                                                "labelStyle": "",
                                                "fieldStyle": "",
                                                "inline": false,
                                                "defaultValue": [],
                                                "remote": true,
                                                "options": [],
                                                "dict": "role",
                                                "disabled": false,
                                                "validator": {
                                                    "required": false
                                                },
                                                "bindKey": "",
                                                "bindFun": "",
                                                "events": []
                                            }
                                        },
                                    ]
                                }
                            ],
                            "options": {
                                "gutter": 10,
                                "justify": "start",
                                "align": "top"
                            }
                        },
                        {
                            "type": "grid",
                            "names": {
                                "zh_CN": "栅格布局",
                                "zh_HK": "栅格布局",
                                "en_US": "栅格布局"
                            },
                            "model": '@id',
                            "columns": [
                                {
                                    "span": 12,
                                    "elements": [
                                        {
                                            "type": "date",
                                            "names": {
                                                "zh_CN": "日期选择器",
                                                "zh_HK": "日期選擇器",
                                                "en_US": "DatePicker"
                                            },
                                            "model": "@id",
                                            "options": {
                                                "labelStyle": "",
                                                "fieldStyle": "",
                                                "defaultValue": "",
                                                "placeholder": "请选择日期",
                                                "placeholders": {
                                                    "zh_CN": "单行文本",
                                                    "zh_HK": "",
                                                    "en_US": ""
                                                },
                                                "startPlaceholders": {
                                                    'zh_CN': '开始时间',
                                                    'zh_HK': '開始時間',
                                                    'en_US': 'start time'
                                                },
                                                "endPlaceholders": {
                                                    'zh_CN': '结束时间',
                                                    'zh_HK': '結束時間',
                                                    'en_US': 'end time'
                                                },
                                                "dateType": "date",
                                                "editable": false,
                                                "clearable": true,
                                                "readonly": false,
                                                "disabled": false,
                                                "validator": {
                                                    "required": false
                                                },
                                                "bindKey": "",
                                                "bindFun": "",
                                                "events": []
                                            }
                                        },

                                    ]
                                },
                                {
                                    "span": 12,
                                    "elements": [
                                        {
                                            "type": "time",
                                            "names": {
                                                "zh_CN": "时间选择器",
                                                "zh_HK": "時間選擇器",
                                                "en_US": "TimePicker"
                                            },
                                            "model": "@id",
                                            "options": {
                                                "labelStyle": "",
                                                "fieldStyle": "",
                                                "placeholders": {
                                                    "zh_CN": "请选择时间",
                                                    "zh_HK": "",
                                                    "en_US": ""
                                                },
                                                "defaultValue": "",
                                                "range": false,
                                                "startPlaceholders": {
                                                    'zh_CN': '开始时间',
                                                    'zh_HK': '開始時間',
                                                    'en_US': 'start time'
                                                },
                                                "endPlaceholders": {
                                                    'zh_CN': '结束时间',
                                                    'zh_HK': '結束時間',
                                                    'en_US': 'end time'
                                                },
                                                "arrowControl": false,
                                                "editable": false,
                                                "clearable": true,
                                                "readonly": false,
                                                "disabled": false,
                                                "validator": {
                                                    "required": false
                                                },
                                                "bindKey": "",
                                                "bindFun": "",
                                                "events": []
                                            }
                                        },
                                    ]
                                }
                            ],
                            "options": {
                                "gutter": 10,
                                "justify": "start",
                                "align": "top"
                            }
                        },
                        {
                            "type": "grid",
                            "names": {
                                "zh_CN": "栅格布局",
                                "zh_HK": "栅格布局",
                                "en_US": "栅格布局"
                            },
                            "model": '@id',
                            "columns": [
                                {
                                    "span": 12,
                                    "elements": [
                                        {
                                            "type": "rate",
                                            "names": {
                                                "zh_CN": "评分",
                                                "zh_HK": "評分",
                                                "en_US": "rate"
                                            },
                                            "model": "@id",
                                            "options": {
                                                "labelStyle": "",
                                                "fieldStyle": "",
                                                "defaultValue": 1,
                                                "max": 5,
                                                "disabled": false,
                                                "allowHalf": false,
                                                "validator": {
                                                    "required": false
                                                },
                                                "bindKey": "",
                                                "bindFun": "",
                                                "events": []
                                            }
                                        },
                                    ]
                                },
                                {
                                    "span": 12,
                                    "elements": [
                                        {
                                            "type": "switch",
                                            "names": {
                                                "zh_CN": "开关",
                                                "zh_HK": "開關",
                                                "en_US": "switch"
                                            },
                                            "model": "@id",
                                            "options": {
                                                "labelStyle": "",
                                                "fieldStyle": "",
                                                "defaultValue": false,
                                                "disabled": false,
                                                "validator": {
                                                    "required": false
                                                },
                                                "bindKey": "",
                                                "bindFun": "",
                                                "events": []
                                            }
                                        },
                                    ]
                                }
                            ],
                            "options": {
                                "gutter": 10,
                                "justify": "start",
                                "align": "top"
                            }
                        },
                        {
                            "type": "grid",
                            "names": {
                                "zh_CN": "栅格布局",
                                "zh_HK": "栅格布局",
                                "en_US": "栅格布局"
                            },
                            "model": '@id',
                            "columns": [
                                {
                                    "span": 12,
                                    "elements": [
                                        {
                                            "type": "slider",
                                            "names": {
                                                "zh_CN": "滑块",
                                                "zh_HK": "滑塊",
                                                "en_US": "slider"
                                            },
                                            "model": "@id",
                                            "options": {
                                                "labelStyle": "",
                                                "fieldStyle": "",
                                                "defaultValue": 0,
                                                "disabled": false,
                                                "min": 0,
                                                "max": 100,
                                                "step": 1,
                                                "showInput": false,
                                                "validator": {
                                                    "required": false
                                                },
                                                "bindKey": "",
                                                "bindFun": "",
                                                "events": []
                                            }
                                        },
                                    ]
                                },
                                {
                                    "span": 12,
                                    "elements": [
                                        {
                                            "type": "number",
                                            "names": {
                                                "zh_CN": "计数器",
                                                "zh_HK": "計數器",
                                                "en_US": "counter"
                                            },
                                            "model": "@id",
                                            "options": {
                                                "labelStyle": "",
                                                "fieldStyle": "",
                                                "defaultValue": 3,
                                                "min": 0,
                                                "max": 100,
                                                "step": 1,
                                                "disabled": false,
                                                "validator": {
                                                    "required": false
                                                },
                                                "bindKey": "",
                                                "bindFun": "",
                                                "events": []
                                            }
                                        }
                                    ]
                                }
                            ],
                            "options": {
                                "gutter": 10,
                                "justify": "start",
                                "align": "top"
                            }
                        },
                    ],
                    "labelPosition|1": ["top", "left", "right"],
                    "id": "",
                    "type": "01",
                    "names": {
                        "zh_CN": "表单标题",
                        "zh_HK": "",
                        "en_US": ""
                    }
                }
            })
        }
        else{
            return Mock.mock({
                status: 'success',
                data: {
                    "grids|1-5": [
                        {
                            "type": "grid",
                            "names": {
                                "zh_CN": "栅格布局",
                                "zh_HK": "栅格布局",
                                "en_US": "栅格布局"
                            },
                            "model": '@id',
                            "columns|2": [
                                {
                                    "span": 12,
                                    "elements|1": [
                                        [{
                                            "type": "input",
                                            "names": {
                                                "zh_CN": "@word",
                                                "zh_HK": "單行文本",
                                                "en_US": "TextField"
                                            },
                                            "options": {
                                                "labelStyle": "",
                                                "fieldStyle": "",
                                                "fieldType": "text",
                                                "defaultValue": "@sentence",
                                                "defaults": {
                                                    'zh_CN': '',
                                                    'zh_HK': '',
                                                    'en_US': ''
                                                },
                                                "placeholder": "请输入仓库名称",
                                                "placeholders": {
                                                    "zh_CN": "单行文本",
                                                    "zh_HK": "",
                                                    "en_US": ""
                                                },
                                                "unit": "",
                                                "units": {
                                                    "zh_CN": "单行文本",
                                                    "zh_HK": "",
                                                    "en_US": ""
                                                },
                                                "readonly": false,
                                                "disabled": false,
                                                "clearable": true,
                                                "suffixIcon": "",
                                                "prefixIcon": "",
                                                "bindKey": "",
                                                "bindFun": "",
                                                "validator": {
                                                    "required": false,
                                                    "dataType": "text",
                                                    "min": 1,
                                                    "max": 10
                                                },
                                                "events": []
                                            },
                                            "model": '@id'
                                        }],
                                        [{
                                            "type": "textarea",
                                            "names": {
                                                "zh_CN": "多行文本",
                                                "zh_HK": "多行文本",
                                                "en_US": "JTextArea"
                                            },
                                            "model": "@id",
                                            "options": {
                                                "labelStyle": "",
                                                "fieldStyle": "",
                                                "defaultValue": "",
                                                "placeholder": "请输入内容",
                                                "placeholders": {
                                                    "zh_CN": "单行文本",
                                                    "zh_HK": "",
                                                    "en_US": ""
                                                },
                                                "readonly": false,
                                                "disabled": false,
                                                "autosize": true,
                                                "bindKey": "",
                                                "bindFun": "",
                                                "validator": {
                                                    "required": false,
                                                    "dataType": "text",
                                                    "pattern": "",
                                                    "min": 1,
                                                    "max": 10
                                                }
                                            }
                                        }],
                                        [{
                                            "type": "select",
                                            "names": {
                                                "zh_CN": "下拉选择框",
                                                "zh_HK": "下拉選擇框",
                                                "en_US": "select"
                                            },
                                            "options": {
                                                "labelStyle": "",
                                                "fieldStyle": "",
                                                "defaultValue": "",
                                                "multiple": false,
                                                "clearable": false,
                                                "placeholder": "请选择",
                                                "placeholders": {
                                                    "zh_CN": "单行文本",
                                                    "zh_HK": "",
                                                    "en_US": ""
                                                },
                                                "options": [],
                                                "remote": true,
                                                "dict": "ROOT_DICT",
                                                "disabled": false,
                                                "validator": {
                                                    "required": false
                                                },
                                                "bindKey": "",
                                                "bindFun": "",
                                                "events": []
                                            },
                                            "model": "@id"
                                        }],
                                        [{
                                            "type": "cascader",
                                            "names": {
                                                "zh_CN": "级联选择器",
                                                "zh_HK": "級聯選擇器",
                                                "en_US": "cascader"
                                            },
                                            "model": "@id",
                                            "options": {
                                                "labelStyle": "",
                                                "fieldStyle": "",
                                                "defaultValue": [],
                                                "disabled": false,
                                                "clearable": false,
                                                "placeholder": "请选择",
                                                "placeholders": {
                                                    "zh_CN": "单行文本",
                                                    "zh_HK": "",
                                                    "en_US": ""
                                                },
                                                "showAllLevels": false,
                                                "checkStrictly": false,
                                                "maxLevel": 3,
                                                "trigger": "hover",
                                                "remote": true,
                                                "dict": "PROVINCE",
                                                "cascaderUrl": "",
                                                "cascaderUrlKey": "",
                                                "cascaderUrlValue": "",
                                                "validator": {
                                                    "required": false
                                                },
                                                "bindKey": "",
                                                "bindFun": "",
                                                "events": []
                                            }
                                        }],
                                        [{
                                            "type": "radio",
                                            "names": {
                                                "zh_CN": "单选框组",
                                                "zh_HK": "單選框組",
                                                "en_US": "radio"
                                            },
                                            "model": "@id",
                                            "options": {
                                                "labelStyle": "",
                                                "fieldStyle": "",
                                                "inline": false,
                                                "defaultValue": "",
                                                "remote": true,
                                                "options": [],
                                                "dict": "aa",
                                                "disabled": false,
                                                "validator": {
                                                    "required": false
                                                },
                                                "bindKey": "",
                                                "bindFun": "",
                                                "events": []
                                            }
                                        }],
                                        [{
                                            "type": "checkbox",
                                            "names": {
                                                "zh_CN": "多选框组",
                                                "zh_HK": "多選框組",
                                                "en_US": "checkbox"
                                            },
                                            "model": "@id",
                                            "options": {
                                                "labelStyle": "",
                                                "fieldStyle": "",
                                                "inline": false,
                                                "defaultValue": [],
                                                "remote": true,
                                                "options": [],
                                                "dict": "aaa",
                                                "disabled": false,
                                                "validator": {
                                                    "required": false
                                                },
                                                "bindKey": "",
                                                "bindFun": "",
                                                "events": []
                                            }
                                        }],
                                        [{
                                            "type": "time",
                                            "names": {
                                                "zh_CN": "时间选择器",
                                                "zh_HK": "時間選擇器",
                                                "en_US": "TimePicker"
                                            },
                                            "model": "@id",
                                            "options": {
                                                "labelStyle": "",
                                                "fieldStyle": "",
                                                "placeholder": "请选择时间",
                                                "placeholders": {
                                                    "zh_CN": "单行文本",
                                                    "zh_HK": "",
                                                    "en_US": ""
                                                },
                                                "defaultValue": "",
                                                "range": false,
                                                "startPlaceholder": "开始时间",
                                                "endPlaceholder": "结束时间",
                                                "arrowControl": false,
                                                "editable": false,
                                                "clearable": true,
                                                "readonly": false,
                                                "disabled": false,
                                                "validator": {
                                                    "required": false
                                                },
                                                "bindKey": "",
                                                "bindFun": "",
                                                "events": []
                                            }
                                        }],
                                        [{
                                            "type": "date",
                                            "names": {
                                                "zh_CN": "日期选择器",
                                                "zh_HK": "日期選擇器",
                                                "en_US": "DatePicker"
                                            },
                                            "model": "@id",
                                            "options": {
                                                "labelStyle": "",
                                                "fieldStyle": "",
                                                "defaultValue": "",
                                                "placeholder": "请选择日期",
                                                "placeholders": {
                                                    "zh_CN": "单行文本",
                                                    "zh_HK": "",
                                                    "en_US": ""
                                                },
                                                "startPlaceholder": "开始日期",
                                                "endPlaceholder": "结束日期",
                                                "dateType": "date",
                                                "editable": false,
                                                "clearable": true,
                                                "readonly": false,
                                                "disabled": false,
                                                "validator": {
                                                    "required": false
                                                },
                                                "bindKey": "",
                                                "bindFun": "",
                                                "events": []
                                            }
                                        }],
                                        [{
                                            "type": "rate",
                                            "names": {
                                                "zh_CN": "评分",
                                                "zh_HK": "評分",
                                                "en_US": "rate"
                                            },
                                            "model": "@id",
                                            "options": {
                                                "labelStyle": "",
                                                "fieldStyle": "",
                                                "defaultValue": 1,
                                                "max": 5,
                                                "disabled": false,
                                                "allowHalf": false,
                                                "validator": {
                                                    "required": false
                                                },
                                                "bindKey": "",
                                                "bindFun": "",
                                                "events": []
                                            }
                                        }],
                                        [{
                                            "type": "switch",
                                            "names": {
                                                "zh_CN": "开关",
                                                "zh_HK": "開關",
                                                "en_US": "switch"
                                            },
                                            "model": "@id",
                                            "options": {
                                                "labelStyle": "",
                                                "fieldStyle": "",
                                                "defaultValue": false,
                                                "disabled": false,
                                                "validator": {
                                                    "required": false
                                                },
                                                "bindKey": "",
                                                "bindFun": "",
                                                "events": []
                                            }
                                        }],
                                        [{
                                            "type": "slider",
                                            "names": {
                                                "zh_CN": "滑块",
                                                "zh_HK": "滑塊",
                                                "en_US": "slider"
                                            },
                                            "model": "@id",
                                            "options": {
                                                "labelStyle": "",
                                                "fieldStyle": "",
                                                "defaultValue": 0,
                                                "disabled": false,
                                                "min": 0,
                                                "max": 100,
                                                "step": 1,
                                                "showInput": false,
                                                "validator": {
                                                    "required": false
                                                },
                                                "bindKey": "",
                                                "bindFun": "",
                                                "events": []
                                            }
                                        }],
                                        [{
                                            "type": "number",
                                            "names": {
                                                "zh_CN": "计数器",
                                                "zh_HK": "計數器",
                                                "en_US": "counter"
                                            },
                                            "model": "@id",
                                            "options": {
                                                "labelStyle": "",
                                                "fieldStyle": "",
                                                "defaultValue": 3,
                                                "min": 0,
                                                "max": 100,
                                                "step": 1,
                                                "disabled": false,
                                                "validator": {
                                                    "required": false
                                                },
                                                "bindKey": "",
                                                "bindFun": "",
                                                "events": []
                                            }
                                        }]
                                    ]
                                }
                            ],
                            "options": {
                                "gutter": 10,
                                "justify": "start",
                                "align": "top"
                            }
                        }
                    ],
                    "labelPosition|1": ["top", "left", "right"],
                    "id": "",
                    "type": "01",
                    "names": {
                        "zh_CN": "表单标题",
                        "zh_HK": "",
                        "en_US": ""
                    }
                }
            })
        }

    }
    else if (param.type === '02') {
        //返回列表数据
        return Mock.mock({
            status: 'success',
            data: {
                "head": {
                    "stripe": true,
                    "border": true,
                    "height": 400,
                    "filters": [],
                    "pageConfig": {
                        "paging": true,
                        "layout": "01",
                        "background": true
                    },
                    "columnConfig|3-6": [
                        {
                            "names": {
                                "zh_CN|+1": ['投资者名称', '投资者类型', '证件类型', '联系人', '手机号码', '状态'],
                                "zh_HK": "",
                                "en_US": ""
                            },
                            "model|+1": ['id1', 'id2', 'id3', 'id4', 'id5', 'id6'],
                            "type": "text",
                            "style": "",
                            "param": "",
                            "btns": [],
                            "fixed": "no",
                            "sortable": false
                        }
                    ]
                },
                "id": "",
                "type": "02",
                "names": {
                    "zh_CN": "列表标题",
                    "zh_HK": "",
                    "en_US": ""
                }
            }
        })

    }

}
//生成列表配置数据
function getTableConfigData(data){
    let param = getUrlParam(data);
    console.log(param);
    let loadType = '01';    //表单数据加载方式
    let layout = '01';      //分页显示

    if(param.id === 'yy-1'){
        //一次加载所有数据，无分页，有统计

    }
    else if(param.id === 'yy-2'){
        //滚动加载，无分页，有统计

    }
    else if(param.id === 'yy-3'){
        //分页加载，有分页，有统计

    }
    else if(param.id === 'yy-4'){

    }
    return Mock.mock({
        status: 'success',
        data: {
            "head": {
                "stripe": true,
                "border": true,
                "isSelect": false,
                "height": '400',
                "rowKey": "id",
                "loadType": "03",
                "filters": [],
                "pageConfig": {
                    "paging": true,
                    "layout": "02",
                    "background": true
                },
                "columnConfig": [
                    {
                        "names": {
                            "zh_CN": "表头标题",
                            "zh_HK": "",
                            "en_US": ""
                        },
                        "model": "id1",
                        "type": "text",
                        "style": "",
                        "param": "",
                        "btns": [],
                        "fixed": "no",
                        "sortable": false
                    },
                    {
                        "names": {
                            "zh_CN": "表头标题",
                            "zh_HK": "",
                            "en_US": ""
                        },
                        "model": "id2",
                        "type": "text",
                        "style": "",
                        "param": "",
                        "btns": [],
                        "fixed": "no",
                        "sortable": false
                    },
                    {
                        "names": {
                            "zh_CN": "表头标题",
                            "zh_HK": "",
                            "en_US": ""
                        },
                        "model": "id3",
                        "type": "text",
                        "style": "",
                        "param": "",
                        "btns": [],
                        "fixed": "no",
                        "sortable": false
                    },
                    {
                        "names": {
                            "zh_CN": "表头标题",
                            "zh_HK": "",
                            "en_US": ""
                        },
                        "model": "id4",
                        "type": "text",
                        "style": "",
                        "param": "",
                        "btns": [],
                        "fixed": "no",
                        "sortable": false
                    }
                ]
            },
            "id": "",
            "type": "02",
            "names": {
                "zh_CN": "列表标题",
                "zh_HK": "",
                "en_US": ""
            }
        }
    })

}

//保存表单
function saveForm() {
    return Mock.mock({
        status: 'success',
        data:{
            message: '提交成功'
        }
    });
}

//获取数据字典
function getCode(data) {
    console.log('模拟字典数据');
    console.log(data);
    return Mock.mock({
        'data|3': [{
            'code|+1': [1, 2, 3],
            'name|+1': ['属性1', '属性2', '属性3']
        }]
    });
}
//获取数据字典
function getCode2(data) {

    console.log(data);
    return Mock.mock({
        'data|3': [{
            'key|+1': [1, 2, 3],
            'title|+1': ['外网属性1', '外网属性2', '外网属性3']
        }]
    });
}

//获取数数据
function getTreeData() {
    console.log('模拟树形控件数据');
    return {
        data: [
            {
                id: 1,
                'label|+1': 1,
                children: [{
                    id: 4,
                    label: '二级 1-1',
                    children: [{
                        id: 9,
                        label: '三级 1-1-1'
                    }, {
                        id: 10,
                        label: '三级 1-1-2'
                    }]
                }]
            }, {
                id: 2,
                'label|+1': 12,
                children: [{
                    id: 5,
                    label: '二级 2-1'
                }, {
                    id: 6,
                    label: '二级 2-2'
                }]
            }, {
                id: 3,
                'label|+1': 20,
                children: [{
                    id: 7,
                    label: '二级 3-1'
                }, {
                    id: 8,
                    label: '二级 3-2'
                }]
            }]
    }
}

//获取列表树形控件数据
function getTableData() {
    console.log('模拟树形控件数据');
    return {
        data: [
            {
                id: 1,
                name: '1',
                dict: '事件'
            },
            {
                id: 2,
                name: '2',
                dict: '事件',
                children:
                [{
                    id: 31,
                    date: '2016-05-01',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1519 弄'
                },
                {
                    id: 32,
                    date: '2016-05-01',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1519 弄'
                }]
            },
            {
                id: 3,
                name: '3',
                dict: '事件',
                hasChildren: true
            },
            {
                id: 4,
                name: '4',
                dict: '事件'
            },
            {
                id: 5,
                name: '5',
                dict: '事件'
            }]
    }
}

//获取列表树形控件数据
function getTableTreeData() {
    console.log('模拟树形控件数据');
    return {
        data: [
            {
                'id|+1': 11,
                name: '1',
                dict: '事件',
                hasChildren: true
            },
            {
                'id|+1': 21,
                name: '1',
                dict: '事件',
                children: []
            },
            ]
    }
}

//表单列表
Mock.mock(/\/biz\/formDesigner\/list/, 'get', getFormList);
//保存表单数据
Mock.mock(/\/biz\/formDesigner\/save/, 'post', saveForm);

//表单配置数据
Mock.mock(/\/biz\/formDesigner\/source/, 'get', getFormConfigData);

//列表配置数据
//Mock.mock(/\/biz\/formDesigner\/source/, 'get', getTableConfigData);

//请求数据字典
Mock.mock(/\/biz\/system\/dict/, 'get', getCode);
//外网数据字典
Mock.mock(/https:\/\/www.baidu.com/, 'get', getCode2);

//模拟树形控件
Mock.mock(/\/biz\/system\/tree/, 'get', getTreeData);

//模拟列表数据,树形结构
Mock.mock(/\/biz\/system\/tableTree/, 'get', getTableTreeData);

//模拟列表数据
Mock.mock(/\/biz\/system\/table/, 'get', getTableData);



