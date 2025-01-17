import { TopLevelSpec } from 'vega-lite'

const data = {
  $schema: 'https://vega.github.io/schema/vega-lite/v4.json',
  data: {
    values: '<DVC_METRIC_DATA>'
  },
  title: '<DVC_METRIC_TITLE>',
  facet: {
    field: 'rev',
    type: 'nominal'
  },
  spec: {
    transform: [
      {
        aggregate: [
          {
            op: 'count',
            as: 'xy_count'
          }
        ],
        groupby: ['<DVC_METRIC_Y>', '<DVC_METRIC_X>']
      },
      {
        impute: 'xy_count',
        groupby: ['rev', '<DVC_METRIC_Y>'],
        key: '<DVC_METRIC_X>',
        value: 0
      },
      {
        impute: 'xy_count',
        groupby: ['rev', '<DVC_METRIC_X>'],
        key: '<DVC_METRIC_Y>',
        value: 0
      },
      {
        joinaggregate: [
          {
            op: 'max',
            field: 'xy_count',
            as: 'max_count'
          }
        ],
        groupby: []
      },
      {
        calculate: 'datum.xy_count / datum.max_count',
        as: 'percent_of_max'
      }
    ],
    encoding: {
      x: {
        field: '<DVC_METRIC_X>',
        type: 'nominal',
        sort: 'ascending',
        title: '<DVC_METRIC_X_LABEL>'
      },
      y: {
        field: '<DVC_METRIC_Y>',
        type: 'nominal',
        sort: 'ascending',
        title: '<DVC_METRIC_Y_LABEL>'
      }
    },
    layer: [
      {
        mark: 'rect',
        width: 300,
        height: 300,
        encoding: {
          color: {
            field: 'xy_count',
            type: 'quantitative',
            title: '',
            scale: {
              domainMin: 0,
              nice: true
            }
          }
        }
      },
      {
        mark: 'text',
        encoding: {
          text: {
            field: 'xy_count',
            type: 'quantitative'
          },
          color: {
            condition: {
              test: 'datum.percent_of_max > 0.5',
              value: 'white'
            },
            value: 'black'
          }
        }
      }
    ]
  }
} as TopLevelSpec

export default data
