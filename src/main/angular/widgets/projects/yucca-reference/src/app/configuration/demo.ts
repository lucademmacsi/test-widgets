export const WidgetsDemo = {
    "discretebarChart": {
        "params": {
            "tenantcode": "smartlab",
            "datasetcode": "NobelPrizeByWinner_9081",
            "groupByColumn": '{"key":"category","label":"Category"}',
            "serieColumns": '[{"key":"id", "label":"id", "countingMode":"count"}]',
            "usertoken": "LRulMu0Ie7nC2auw1q_x4MDNLkca",
            "barRatio": 1,
            "valuesAsCategory": true,
            "widgetTitle": "Nobel Prize",
            "widgetSubtitle": "Count by category",
            //"xAxis": '{"show":false}',
            //"yAxis": '{"show":false}',
            "xAxisTick": '{"rotate":-45, "multiline":false, "outer":false}',
            "yAxisTick": '{"count":5, "outer": false}',
            "numberFormat": '{"decimal":0}',
        },
        "styles": {
            //"header": "color:green;",
            //"headerSmall": "color: red"
        }
    },
    "pieChart": {
        "params": {
            "widgetTitle": "Nobel Prize",
            "widgetSubtitle": "Count by category",
            "tenantcode": "smartlab",
            "datasetcode": "NobelPrizeByWinner_9081",
            "groupByColumn": '{ "key": "category", "label": "Category", "countingMode": "count" }',
            "valueColumn": '{ "key": "id", "label": "id" }',
            "render": '{"type":"donut", "title": "Nobel Prize", "donutRatio":0.6  }',
            "usertoken": "LRulMu0Ie7nC2auw1q_x4MDNLkca",
            "debug": "true"
        },
        "styles": {
        }
    },
    "sankeyDiagram": {
        "params": {
            "widgetTitle": "Canadian Study Satisfaction",
            "widgetSubtitle": "Level → Field  → \"Would choose same field of study completed again?\"",

            "tenantcode": "smartlab",
            "datasetcode": "CanadianPostgraduateProfessions_9667",
            "valueColumn": '{"key":"COUNTS","label":"Counts", "countingMode":"sum"}',
            "nodeColumns": '[{"key":"HIGHESTLEVELOFSTUDY","label":"Highest level of study"},{"key":"FIELDOFSTUDYSHORT","label":"Field of study short"},{"key":"WOULDCHOOSESAMEFIELDOFSTUDYCOMPLETEDAGAIN","label":"Would choose same field of study completed again"}]',
            //"sort": 'anno',
            //"widgetHeight": "250",
            //"mainChartColor": "#2e899e",
            //"filter": "(FIELDOFSTUDYCODE%20ne%20%27FOS113%27)",
            "usertoken": "LRulMu0Ie7nC2auw1q_x4MDNLkca",
        },
        "styles": {
            "headerSmall": "display: block;font-size: .8rem; margin-bottom: 1em;"
        }
    },
    "choroplethMap": {
        "params": {
            "tenantcode": "smartlab",
            "datasetcode": "EuropeanStructuralInvestmentFunds_9661",
            "valueColumn": '{"key":"TotalAmount","label":"Amount", "countingMode":"sum"}',
            "groupByColumn": '{ "key": "State", "label": "State"}',
            "geojsons": '[{ "key": "iso_a2", "url": "assets/geojson/europe_countries_geojson.json" }]',
            "colors": '{ "mainChartColor": "#0082a0" }',
            "usertoken": "LRulMu0Ie7nC2auw1q_x4MDNLkca",
            "widgetHeight": 300
        },
        "styles": {
        }
    },
    //"treemap": {
    //    "tenantcode": "smartlab",
    //    "datasetcode": "ImpreseFemminiliRegistrateAttiveIscritteECessateInProvinciaDiTorino_10526",
    //    "widgetTitle": "Imprese femminili registrate",
    //    "widgetSubtitle": "Camera di commercio di Torino",
    //    "valueColumn": '{ "key": "Registrate", "label": "Registrate ", "countingMode": "sum" }',
    //    "valueColumn2": '{ "key": "Attive", "label": "Attive", "countingMode": "sum" }',
    //    "treeColumns": '[{ "key": "Comune", "label": "Comune" }, { "key": "Anno", "label": "Anno" }, { "key": "Trimestre", "label": "Trimestre" }]',
    //    "chartColors": { "mainChartColor": "#0082a0" },
    //    "usertoken": "LRulMu0Ie7nC2auw1q_x4MDNLkca",
    //    "numberFormat": '{"decimal":0}'
    //},
    "treemapChart": {
        "params": {
            "tenantcode": "smartlab",
            "datasetcode": "NobelPrizeByWinner_9081",
            "widgetTitle": "Nobel Prize",
            "widgetSubtitle": "Count by category",
            "valueColumn": '{"key":"id","label":"id", "countingMode":"count"}',
            //"valueColumn2": '{ "key": "Attive", "label": "Attive", "countingMode": "sum" }',
            "treeColumns": '[{"key":"category","label":"Category"},{"key":"bornCountry","label":"Born Country"},{"key":"gender","label":"Gender"}]',
            "chartColors": '{ "mainChartColor": "#0082a0" }',
            "usertoken": "LRulMu0Ie7nC2auw1q_x4MDNLkca",
            "numberFormat": '{"decimal":0}',
            "rootLabel": "All Categories",
            "boxRadius": '{"rx":4,"ry":4}',
            //"widgetWidth": "242",
            //"widgetHeight": "242",
        },
        "styles": {
        }
    },
    "multiChart": {
        "params": {
            "debug": true,
            "tenantcode": "smartlab",
            "datasetcode": "ImpreseFemminiliRegistrateAttiveIscritteECessateInProvinciaDiTorino_10526",
            "groupByColumn": '{ "key": "Anno", "label": "Anno", "countingMode": "sum" }',
            "serieColumns": '[{ "key": "Registrate", "label": "Registrate", "countingMode": "sum", "yAxis": "1", "type": "area", "color": "#e0e0e0" }, { "key": "Attive", "label": "Attive", "countingMode": "sum", "type": "bar", "yAxis": "1", "color": "#2da9d9" }, { "key": "Iscrizioni", "label": "Iscrizioni", "countingMode": "sum", "yAxis": "1", "type": "line" }]',
            "groupByDatetime": false,
            "usertoken": "LRulMu0Ie7nC2auw1q_x4MDNLkca",
            "numberFormat": '{"formatBigNumber":true,"decimal":0}',
            "widgetTitle": "Turin companies",
            "widgetSubtitle": "Count by year",
            //"xAxis": '{"show":false}',
            //"yAxis": '{"show":false}',
            //"widgetWidth": "242",
            //"widgetHeight": "242",
        },
        "styles": {
        }
    },
    "dataexplorerTable": {
        "params": {
            "tenantcode": "smartlab",
            "datasetcode": "NobelPrizeByWinner_9081",
            "widgetTitle": "Nobel Prize",
            "widgetSubtitle": "List of winners",
            "columnsToShow": '["firstname", "surname", "born", "category"]',
            "usertoken": "LRulMu0Ie7nC2auw1q_x4MDNLkca",
            "widgetWidth": "242",
            "widgetHeight": "242",
        }
    },
    "controlSelect": {
        "params": {
            "groupByColumns": '[{ "key": "category", "label": "Category" }, { "key": "gender", "label": "Gender" }, { "key": "share", "label": "Sharing"}]',
            "label": "Premi Nobel",
            "hint": "Vincitori per materia, o per genere o per numero di persone che hanno condiviso il premio",
            "selectEmptyLabel": "Scegli il tipo",
            "render": "button",
            "direction": "row",
            "alignItems": "start",
            "selectedValue": "category"
        },
        "styles": {
        },
        "relatedWidget": { "section": "related", "widget": "controlSelectRelated" },
    },

    "controlSelectRelated": {
        "params": {
            "tenantcode": "smartlab",
            "datasetcode": "NobelPrizeByWinner_9081",
            "groupByColumn": '{ "key": "category", "label": "Category", "countingMode": "count" }',
            "valueColumn": '{ "key": "id", "label": "id" }',
            "render": '{"type":"donut", "title": "Nobel Prize", "donutRatio":0.6, "showValue": false, "showPercent": true }',
            "colors": '{"mainChartColor":"#2e899e"}',
            "usertoken": "LRulMu0Ie7nC2auw1q_x4MDNLkca"
        },
        "styles": {
        }
    },
    "filterDatasetSelect": {
        "params": {
            "filters": '[{"label": "20th century", "condition": "year lt 2000" },{"label": "21th century", "condition": "year ge 2000" }]',
            "label": "Nobel Prize",
            "hint": "Peace nobel prize by gender",
            "render": "button",
            "direction": "row",
            "alignItems": "start",
            "selectedValue": "category"
        },
        "styles": {
        },
        "relatedWidget": { "section": "related", "widget": "filterDatasetSelectRelated" },
    },
    "filterDatasetSelectRelated": {
        "params": {
            "tenantcode": "smartlab",
            "datasetcode": "NobelPrizeByWinner_9081",
            "groupByColumn": '{ "key": "gender", "label": "Gender", "countingMode": "count" }',
            "filter": "category eq 'peace'",
            "valueColumn": '{ "key": "id", "label": "id" }',
            "render": '{"type":"donut", "title": "Peace Nobel Prize", "donutRatio":0.4, "showValue": false, "showPercent": true }',
            "colors": '{"mainChartColor":"#2e899e"}',
            "usertoken": "LRulMu0Ie7nC2auw1q_x4MDNLkca",
            "otherFilterLogic": "and"

        },
        "styles": {
        }
    },

    "horizontalMultiBarChart": {
        "params": {
            "tenantcode": "smartlab",
            "datasetcode": "TokyoUniversityStudents_9796",
            "widgetTitle": "Tokyo University ",
            "widgetSubtitle": "Students by course",
            "groupByColumn": '{ "key": "course", "label": "Course", "countingMode": "count" }',
            "serieColumns": '[{ "key": "gender", "label": "Male", "countingMode": "count", "type": "bar", "yAxis": "1", "color": "#e0e0e0", "side" : "L" , "dataFilter":"Male"},{ "key": "gender", "label": "Female", "countingMode": "count", "type": "bar", "yAxis": "1", "color": "#aaaaaa", "side" : "R", "dataFilter":"Female" }]',
            "usertoken": 'LRulMu0Ie7nC2auw1q_x4MDNLkca',
            "groupByDatetime": 'false',
            "valuesAsCategory": false,
            "yAxisTick": '{"count":3, "outer": false}',
            "numberFormat": '{"decimal":0}',
            "colors": '{"chartColors" : ["#364E59","#01ACD2"]}',
            "barRatio": .8,
            //"xAxis": '{"show":false}',
            //"yAxis": '{"show":false}',

        },
        "styles": {
        }
    },

    // "lineChart": {
    //     "params": {
    //         "tenantcode": "smartlab",
    //         "datasetcode": "ImpreseFemminiliRegistrateAttiveIscritteECessateInProvinciaDiTorino_10526",
    //         "widgetTitle": "Imprese femminili ",
    //         "widgetSubtitle": "Iscrizioni ed Attivazioni Prov. Torino",
    //         "groupByColumn": '{ "key": "Anno", "label": "Anno", "countingMode": "sum" }',
    //         "serieColumns": '[{ "key": "Iscrizioni", "label": "Iscrizioni", "countingMode": "sum", "yAxis": "1", "type": "line", "color":"#00aed7" },{ "key": "Registrate", "label": "Registrate", "countingMode": "sum", "yAxis": "1", "type": "line", "color":"#0098bb" }]',
    //         "groupByDatetime": false,
    //         "usertoken": "LRulMu0Ie7nC2auw1q_x4MDNLkca",
    //         "numberFormat": '{"formatBigNumber":true,"decimal":0}',
    //         //"xAxis": '{"show":false}',
    //         //"yAxis": '{"show":false}',
    //         //"widgetWidth": "242",
    //         //"widgetHeight": "242",
    //     },
    //     "styles": {
    //     }
    // },
    "lineChart": {
        "params": {
            "debug": true,
            "tenantcode": "smartlab",
            "datasetcode": "Australianforeignstudents20072009_9501",
            "widgetTitle": "Australian Foreign Students",
            "widgetSubtitle": "2007 - 2009",
            "groupByColumn": '{ "key": "Year", "label": "Year", "countingMode": "count" }',
            "serieColumns": '[{"type":"line","key":"Jurisprudence","label":"Jurisprudence","countingMode":"sum","color":"#005062","strokeWidth":2,"interpolate":"linear","classed":"solid"},{"type":"line","key":"Physics","label":"Physics","countingMode":"sum","color":"#006f89","strokeWidth":2,"classed":"solid","interpolate":"linear"},{"type":"line","key":"Mathematics","label":"Mathematics","countingMode":"sum","color":"#008faf","strokeWidth":2,"classed":"solid","interpolate":"linear"},{"type":"line","key":"Medicine","label":"Medicine","countingMode":"sum","color":"#5ccbe5","strokeWidth":2,"classed":"solid","interpolate":"linear"},{"type":"line","key":"History","label":"History","countingMode":"sum","color":"#00aed6","strokeWidth":2,"classed":"solid","interpolate":"linear"},{"type":"line","key":"Chemistry","label":"Chemistry","countingMode":"sum","color":"#2ebcdd","strokeWidth":2,"classed":"solid","interpolate":"linear"}]',
            "groupByDatetime": false,
            "usertoken": "LRulMu0Ie7nC2auw1q_x4MDNLkca",
            "numberFormat": '{"formatBigNumber":true,"decimal":0}',
            //"xAxis": '{"show":false}',
            //"yAxis": '{"show":false}',
            //"widgetWidth": "242",
            //"widgetHeight": "242",
        },
        "styles": {
        }
    },

    "discreteTable": {
        "params": {
            "tenantcode": "smartlab",
            "datasetcode": "Australianforeignstudents20072009_9501",
            "serieColumns": '[{ "key": "SudAmerica", "label": "Sud America", "countingMode": "sum", "yAxis": "1", "type": "line", "color": "#ff8585", "strokeWidth": 4, "classed": "solid", "interpolate": "basis" }, { "key": "NorthAmerica", "label": "North America", "countingMode": "sum", "yAxis": "1", "type": "line", "color": "#dc0000", "strokeWidth": 4, "classed": "solid", "interpolate": "basis" }, { "key": "Europe", "label": "Europe", "countingMode": "sum", "yAxis": "1", "type": "line", "color": "#9ade00", "strokeWidth": 4, "classed": "solid", "interpolate": "basis" }, { "key": "Africa", "label": "Africa", "countingMode": "sum", "yAxis": "1", "type": "line", "color": "#333333", "strokeWidth": 4, "classed": "solid", "interpolate": "basis" }, { "key": "Asia", "label": "Asia", "countingMode": "sum", "yAxis": "1", "type": "line", "color": "#fbb32e", "strokeWidth": 4, "classed": "solid", "interpolate": "basis" }]',
            "groupByColumn": '{ "key": "Year", "label": "Year" }',
            "usertoken": "LRulMu0Ie7nC2auw1q_x4MDNLkca",
            "widgetWidth": 242,
            "widgetHeight": 242,
            "numberFormat": '{"formatBigNumber":true,"decimal":0, "textAfter" : ""}',
            //"colors": '{ chartColors: ["#422901", "#5c3901", "#754902", "#8f5902", "#a3772f", "#b7955d2, "#ccb38b", "#e0d1b8"] }',
        },
        "styles": {
            "discreteTableTd": "white-space:nowrap;"
        }
    },

    "singleData": {
        "params": {
            "tenantcode": "smartlab",
            "datasetcode": "Australianforeignstudents20072009_9501",
            "widgetTitle": "Australian Foreign Students",
            "widgetSubtitle": "2007 - 2009",
            "valueColumn": '{ "key": "GenderMale", "label": "GenderMale" }',
            "usertoken": "LRulMu0Ie7nC2auw1q_x4MDNLkca",
            "numberFormat": '{"formatBigNumber":true,"decimal":0}',
            "growAnimation": true,
        },
        "styles": {
            "singleValue": "color: #0098BB; font-size: 30px; font-weight: bold; font-stretch: expanded;",
            "singleLabel": "color: black; font-size: 12px; font-weight: bold; font-stretch: expanded;"
        }
    },

}
