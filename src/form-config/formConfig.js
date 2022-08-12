import {deepClone} from '../util/common'


//基础表单配置
let basicFormConfig = [
    {
        type: 'input',
        icon: 'icon-danhangwenben',
        names: {
            'zh_CN': '单行文本',
            'zh_HK': '單行文本',
            'en_US': 'TextField'
        },
        options: {
            labelStyle: '',
            fieldStyle: '',
            fieldType: 'text',
            defaults: {
                'zh_CN': '',
                'zh_HK': '',
                'en_US': ''
            },
            placeholders: {
                'zh_CN': '请输入内容',
                'zh_HK': '請輸入內容',
                'en_US': 'Please enter the content'
            },
            units: {
                'zh_CN': '',
                'zh_HK': '',
                'en_US': ''
            },

            readonly: false,
            disabled: false,
            clearable: true,
            isPassword: false,

            suffixIcon: '',
            prefixIcon: '',

            bindKey: '',
            bindFun: '',
            events: [],
            validator: {
                required: false,
                dataType: 'text',
                min: 1,
                max: 10,
            }
        }
    },
    {
        type: 'textarea',
        icon: 'icon-duohangwenben',
        names: {
            'zh_CN': '多行文本',
            'zh_HK': '多行文本',
            'en_US': 'JTextArea'
        },
        model: '',
        options: {
            labelStyle: '',
            fieldStyle: '',
            defaults: {
                'zh_CN': '',
                'zh_HK': '',
                'en_US': ''
            },
            placeholders: {
                'zh_CN': '多行文本',
                'zh_HK': '',
                'en_US': ''
            },
            readonly: false,
            disabled: false,
            autosize: true,

            bindKey: '',
            bindFun: '',
            events: [],
            validator: {
                required: false,
                dataType: 'text',
                pattern: '',
                min: 1,
                max: 10,
            }
        }
    },
    {
        type: 'select',
        names: {
            'zh_CN': '下拉选择框',
            'zh_HK': '下拉選擇框',
            'en_US': 'select'
        },
        icon: 'icon-xuanzekuang',
        options: {

            labelStyle: '',
            fieldStyle: '',
            defaultValue: '',
            disabled: false,
            multiple: false,
            clearable: false,
            placeholders: {
                'zh_CN': '请选择',
                'zh_HK': '',
                'en_US': ''
            },

            dataSources: 'dict',
            dict: 'ROOT_DICT',
            options: [],
            internet: 'https://www.baidu.com/',
            value: 'key',
            label: 'title',

            bindKey: '',
            bindFun: '',
            events: [],
            validator: {
                required: false
            }
        }
    },
    {
        type: 'cascader',
        names: {
            'zh_CN': '级联选择器',
            'zh_HK': '級聯選擇器',
            'en_US': 'cascader'
        },
        model: '',
        icon: 'icon-jilian',
        options: {
            labelStyle: '',
            fieldStyle: '',
            defaultValue: [],
            disabled: false,
            clearable: false,
            placeholders: {
                'zh_CN': '单行文本',
                'zh_HK': '',
                'en_US': ''
            },

            showAllLevels: false,
            checkStrictly: false,
            maxLevel: 3,
            trigger: 'hover',

            dataSources: 'once',
            dict: 'PROVINCE',
            options: [],
            internet: 'https://www.baidu.com/',
            value: 'key',
            label: 'title',

            remote: true,
            cascaderUrl: '',
            cascaderUrlKey: '',
            cascaderUrlValue: '',

            bindKey: '',
            bindFun: '',
            events: [],
            validator: {
                required: false
            }
        }
    },
    {
        type: 'radio',
        names: {
            'zh_CN': '单选框组',
            'zh_HK': '單選框組',
            'en_US': 'radio'
        },
        model: '',
        icon: 'icon-danxuankuang',
        options: {
            labelStyle: '',
            fieldStyle: '',
            inline: false,
            disabled: false,
            defaultValue: '',

            dataSources: 'dict',
            dict: 'ROOT_DICT',
            options: [],
            internet: 'https://www.baidu.com/',
            value: 'key',
            label: 'title',

            bindKey: '',
            bindFun: '',
            events: [],
            validator: {
                required: false
            }
        }
    },
    {
        type: 'checkbox',
        names: {
            'zh_CN': '多选框组',
            'zh_HK': '多選框組',
            'en_US': 'checkbox'
        },
        model: '',
        icon: 'icon-duoxuankuang',
        options: {
            labelStyle: '',
            fieldStyle: '',
            inline: false,
            disabled: false,
            defaultValue: [],

            dataSources: 'dict',
            dict: 'ROOT_DICT',
            options: [],
            internet: 'https://www.baidu.com/',
            value: 'key',
            label: 'title',

            bindKey: '',
            bindFun: '',
            events: [],
            validator: {
                required: false
            },

        }
    },
    {
        type: 'tree',
        icon: 'icon-riqi',
        names: {
            'zh_CN': '树形控件',
            'zh_HK': '樹形控件',
            'en_US': 'Tree'
        },
        model: '',
        options: {
            labelStyle: '',
            fieldStyle: '',

            options: [
                {
                    id: 1,
                    label: '一级 1',
                    disabled: true,
                    children: [{
                        id: 4,
                        label: '二级 1-1',
                        children: [{
                            id: 9,
                            label: '三级 1-1-1',
                            disabled: true,
                        }, {
                            id: 10,
                            label: '三级 1-1-2'
                        }]
                    }]
                }, {
                    id: 2,
                    label: '一级 2',
                    children: [{
                        id: 5,
                        label: '二级 2-1'
                    }, {
                        id: 6,
                        label: '二级 2-2'
                    }]
                }, {
                    id: 3,
                    label: '一级 3',
                    children: [{
                        id: 7,
                        label: '二级 3-1'
                    }, {
                        id: 8,
                        label: '二级 3-2'
                    }]
                }],
            props: {children: 'children', label: 'label'},
            showCheckbox: true,    //节点是否可被选择
            defaultExpandAll: false,    //是否默认展开所有节点
            accordion: false,           //是否每次只打开一个同级树节点展开

            dataSources: 'once',
            dict: '/biz/system/tree',
            internet: 'https://www.baidu.com/',
            value: 'key',
            label: 'title',

            remote: true,
            cascaderUrl: '',
            cascaderUrlKey: '',
            cascaderUrlValue: '',


            treeUrl: '/biz/system/tree',
            treeUrlKey: 'id',
            treeUrlValue: '',

            validator: {
                required: false
            },
            bindKey: '',
            bindFun: ''
        }
    },
    {
        type: 'rate',
        names: {
            'zh_CN': '评分',
            'zh_HK': '評分',
            'en_US': 'rate'
        },
        model: '',
        icon: 'icon-pingfen',
        options: {
            labelStyle: '',
            fieldStyle: '',
            defaultValue: 1,
            max: 5,

            disabled: false,
            allowHalf: false,

            bindKey: '',
            bindFun: '',
            events: [],
            validator: {
                required: false
            }
        }
    },
    {
        type: 'time',
        names: {
            'zh_CN': '时间选择器',
            'zh_HK': '時間選擇器',
            'en_US': 'TimePicker'
        },
        model: '',
        icon: 'icon-shijian',
        options: {
            labelStyle: '',
            fieldStyle: '',
            placeholders: {
                'zh_CN': '请选择时间',
                'zh_HK': '',
                'en_US': ''
            },
            defaultValue: '',
            range: false,
            //startPlaceholder: '开始时间',
            startPlaceholders: {
                'zh_CN': '开始时间',
                'zh_HK': '開始時間',
                'en_US': 'start time'
            },
            //endPlaceholder: '结束时间',
            endPlaceholders: {
                'zh_CN': '结束时间',
                'zh_HK': '結束時間',
                'en_US': 'end time'
            },
            arrowControl: false,//是否用箭头选择

            editable: false,//文本框可输入
            clearable: true,//是否显示清除
            readonly: false,
            disabled: false,

            bindKey: '',
            bindFun: '',
            events: [],
            validator: {
                required: false
            }
        }
    },
    {
        type: 'date',
        names: {
            'zh_CN': '日期选择器',
            'zh_HK': '日期選擇器',
            'en_US': 'DatePicker'
        },
        model: '',
        icon: 'icon-riqi',
        options: {
            labelStyle: '',
            fieldStyle: '',
            defaultValue: '',
            placeholders: {
                'zh_CN': '请选择日期',
                'zh_HK': '',
                'en_US': ''
            },
            startPlaceholders: {
                'zh_CN': '开始日期',
                'zh_HK': '開始日期',
                'en_US': 'start date'
            },
            endPlaceholders: {
                'zh_CN': '结束日期',
                'zh_HK': '結束日期',
                'en_US': 'date closed'
            },
            dateType: 'date',

            editable: false,//文本框可输入
            clearable: true,//是否显示清除
            readonly: false,
            disabled: false,

            bindKey: '',
            bindFun: '',
            events: [],
            validator: {
                required: false
            }
        }
    },
    {
        type: 'color',
        names: {
            'zh_CN': '颜色选择器',
            'zh_HK': '顏色選擇器',
            'en_US': 'color picker'
        },
        model: '',
        icon: 'icon-yanse',
        options: {
            labelStyle: '',
            fieldStyle: '',
            defaultValue: '',
            disabled: false,
            showAlpha: false,

            bindKey: '',
            bindFun: '',
            events: [],
            validator: {
                required: false
            }
        }
    },
    {
        type: 'switch',
        names: {
            'zh_CN': '开关',
            'zh_HK': '開關',
            'en_US': 'switch'
        },
        model: '',
        icon: 'icon-kaiguanguan',
        options: {
            labelStyle: '',
            fieldStyle: '',
            defaultValue: false,
            disabled: false,

            bindKey: '',
            bindFun: '',
            events: [],
            validator: {
                required: false
            }
        }
    },
    {
        type: 'slider',
        names: {
            'zh_CN': '滑块',
            'zh_HK': '滑塊',
            'en_US': 'slider'
        },
        model: '',
        icon: 'icon-huakuai',
        options: {
            labelStyle: '',
            fieldStyle: '',
            defaultValue: 0,
            disabled: false,

            min: 0,
            max: 100,
            step: 1,

            showInput: false,

            bindKey: '',
            bindFun: '',
            events: [],
            validator: {
                required: false
            }
        }
    },
    {
        type: 'number',
        icon: 'icon-jishu',
        names: {
            'zh_CN': '计数器',
            'zh_HK': '計數器',
            'en_US': 'counter'
        },
        model: '',
        options: {
            labelStyle: '',
            fieldStyle: '',
            defaultValue: 3,

            min: 0,
            max: 100,
            step: 1,

            disabled: false,

            bindKey: '',
            bindFun: '',
            events: [],
            validator: {
                required: false
            }
        }
    },
];
//容器组件配置
let layoutFormConfig = [
    {
        type: 'grid',
        names: {
            'zh_CN': '栅格布局',
            'zh_HK': '柵格布局',
            'en_US': 'Grid Layout'
        },
        icon: 'icon-zhage',
        model: '',
        columns: [
            {
                span: 12,
                elements: []
            },
            {
                span: 12,
                elements: []
            }
        ],
        options: {
            gutter: 10,
            justify: 'start',
            align: 'top'
        }
    }
]
//生成复合选择框配置
let compoundFormConfig = (function() {
    //生成select初始化属性
    let select = null;
    let input = null;
    basicFormConfig.forEach(item => {
        if (item.type === 'select') {
            select = deepClone(item);
        }
        if (item.type === 'input') {
            input = deepClone(item);
            input.names = {
                'zh_CN': '复合表单',
                'zh_HK': '複合表單',
                'en_US': 'The composite form'
            };
        }
    });
    select.wrapType = 'compound';
    input.wrapType = 'compound';
    return [{
        type: 'compound',
        icon: 'icon-zuhe',
        names: {
            'zh_CN': '复合表单',
            'zh_HK': '複合表單',
            'en_US': 'The composite form'
        },
        compoundItems: [
            select,
            input
        ],
        options: {
        }
    }]
        ;
})();
//表单初始化数据
let formConfig = {
    grids: [],
    labelPosition: 'top',
    id: '',
    type: '01',
    names: {
        'zh_CN': '表单标题',
        'zh_HK': '',
        'en_US': ''
    }
};

//列表属性
function GenerateTableColumnConfig(){
    let input = null;
    basicFormConfig.forEach(item => {
        if (item.type === 'input') {
            input = deepClone(item);
        }
    });
    this.names = {
        'zh_CN': '表头标题',
        'zh_HK': '',
        'en_US': ''
    };
    this.model = Date.now() + '_' + Math.ceil(Math.random() * 99999);
    this.type = 'text';
    this.style = '';
    this.param = '';
    this.events = [];
    this.fixed = 'no';
    this.sortable = false;

    this.addType = 'input';
    this.addTypeoptions = input;
}

//列表-列配置
let tableColumnConfig = new GenerateTableColumnConfig();
//列表配置
let tableConfig = {
    head: {
        stripe: true,
        border: true,
        isSelect: false,
        height: 400,
        rowKey: 'id',
        loadType: '01',

        //pagination: true,
        //可筛选元素
        filters: [],
        pageConfig: {
            //是否显示
            paging: true,
            //显示内容
            layout: '01',
            //分页是否带背景
            background: true

        },
        columnConfig: [
            new GenerateTableColumnConfig(),
            new GenerateTableColumnConfig(),
            new GenerateTableColumnConfig(),
            new GenerateTableColumnConfig()
        ]
    },
    id: '',
    type: '02',
    icon: 'icon-listpress',
    names: {
        'zh_CN': '列表标题',
        'zh_HK': '列表標題',
        'en_US': 'List Title'
    }
};


export {
    basicFormConfig,
    layoutFormConfig,
    compoundFormConfig,
    GenerateTableColumnConfig,
    formConfig,
    tableConfig,
}

