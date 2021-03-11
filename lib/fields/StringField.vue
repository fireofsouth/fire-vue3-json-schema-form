<!--  -->
<template>
  <input type="text" :value="value" @input="handleChange" />
</template>

<script>
import { FiledPropsDefine } from '../types'
export default {
  props: FiledPropsDefine,
  setup(props) {
    const handleChange = (e) => {
      console.log('----------->', e.target.value)
      props.onChange(e.target.value)
    }
    return { handleChange }
  },
}
</script>
<style lang="scss" scoped></style>
