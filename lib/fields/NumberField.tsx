import { FiledPropsDefine } from '../types'
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'NumberField',
  props: FiledPropsDefine,
  setup() {
    return () => {
      return <div>number field</div>
    }
  },
})
