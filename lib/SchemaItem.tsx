import { computed, defineComponent, PropType } from 'vue'
import NumberField from './fields/NumberField.vue'
import StringField from './fields/StringField.vue'
import { SchemaTypes, FiledPropsDefine } from './types'
import { retrieveSchema } from './utils'
export default defineComponent({
  name: 'SchemaItem',
  props: FiledPropsDefine,
  setup(props, { slots, emit, attrs }) {
    const retrievedSchemaRef = computed(() => {
      const { schema, rootSchema, value } = props
      return retrieveSchema(schema, rootSchema, value)
    })
    return () => {
      // TODO: 如果type没有指定， 需要猜测type
      const { schema } = props
      const type = schema?.type

      let Component: any

      switch (type) {
        case SchemaTypes.NUMBER: {
          Component = NumberField
          break
        }
        case SchemaTypes.STRING: {
          Component = StringField
          break
        }
        default: {
          console.warn(`${type} is not supported`)
        }
      }

      return <Component {...props} />
    }
  },
})
