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
      const value = e.target.value
      const num = Number(value)
      if (!Number.isNaN(num)) {
        props.onChange(num)
      } else {
        props.onChange(undefined)
      }
    }
    return { handleChange }
  },
}
</script>
<style lang="scss" scoped></style>
