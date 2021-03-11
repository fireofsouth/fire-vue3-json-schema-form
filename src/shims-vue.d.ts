declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<typeof defineComponent>
  export default component
}
