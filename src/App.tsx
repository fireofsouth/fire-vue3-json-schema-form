import { defineComponent, reactive, ref, Ref, watchEffect } from 'vue'
import MonacoEditor from './components/MonacoEditor'
import { createUseStyles } from 'vue-jss'
import demos from './demos'
import SchemaForm from '../lib'
// TODO: 在lib中export
type Schema = any
type UISchema = any
function toJson(data: any) {
  return JSON.stringify(data, null, 2)
}
const schema = {
  type: 'string',
}
const useStyle = createUseStyles({
  editor: {
    minHeight: 400,
  },
  container: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    width: '1200px',
    margin: '0 auto',
  },
  menu: {
    marginBottom: 20,
  },
  code: { width: 1000, flexShrink: 0 },
  codePanel: {
    minHeight: 400,
    marginBottom: 20,
  },
  uiAndValue: {
    display: 'flex',
    justifyContent: 'space-between',
    '&>*': {
      width: '46%',
    },
  },
  content: {
    display: 'flex',
  },
  form: {
    padding: '0 20px',
    flexGrow: 1,
  },
  menuButton: {
    appearance: 'none',
    borderWidth: 0,
    backgroundColor: 'transparent',
    cursor: 'pointer',
    display: 'inline-block',
    padding: 15,
    borderRadius: 5,
    '&:hover': {
      backgroundColor: '#efefef',
    },
  },
  menuSelected: {
    background: '#337ab7',
    color: '#fff',
    '&:hover': {
      backgroundColor: '#337ab7',
    },
  },
})

export default defineComponent({
  setup() {
    const schemaRef: Ref<any> = ref(schema)
    const selectedRef: Ref<number> = ref(0)
    const demo: {
      schema: Schema | null
      data: any
      uiSchema: UISchema | null
      schemaCode: string
      dataCode: string
      uiSchemaCode: string
    } = reactive({
      schema: null,
      data: {},
      uiSchema: {},
      schemaCode: '',
      dataCode: '',
      uiSchemaCode: '',
    })

    watchEffect(() => {
      const index = selectedRef.value
      const d = demos[index]
      demo.schema = d.schema
      demo.data = d.default
      demo.uiSchema = d.uiSchema
      demo.schemaCode = toJson(d.schema)
      demo.dataCode = toJson(d.default)
      demo.uiSchemaCode = toJson(d.uiSchema)
    })

    const methodRef: Ref<any> = ref()
    const classesRef = useStyle()
    const handleChange = (v: any) => {
      demo.data = v
      demo.dataCode = toJson(v)
    }
    const handleCodeChange = (
      field: 'schema' | 'data' | 'uiSchema',
      value: string,
    ) => {
      try {
        const json = JSON.parse(value)
        demo[field] = json
        ;(demo as any)[`${field}Code`] = value
      } catch (err) {
        console.log(err)
      }
      schemaRef.value = schema
    }
    const handleSchemaChange = (v: string) => handleCodeChange('schema', v)
    const handleDataChange = (v: string) => handleCodeChange('data', v)
    const handleUISchemaChange = (v: string) => handleCodeChange('uiSchema', v)
    return () => {
      // const code = toJson(schemaRef.value)
      const classes = classesRef.value
      const selected = selectedRef.value
      console.log(methodRef)
      return (
        <div class={classes.container}>
          <div class={classes.menu}>
            <h1>Vue3 JsonSchema Form</h1>
            <div>
              {demos.map((demo: any, index: number) => (
                <button
                  class={{
                    [classes.menuButton]: true,
                    [classes.menuSelected]: index === selected,
                  }}
                  onClick={() => {
                    selectedRef.value = index
                  }}
                >
                  {demo.name}
                </button>
              ))}
            </div>
          </div>

          <div class={classes.content}>
            <div class={classes.code}>
              <MonacoEditor
                code={demo.schemaCode}
                onChange={handleSchemaChange}
                title="schema"
                class={classes.editor}
              />
              <div class={classes.uiAndValue}>
                <MonacoEditor
                  code={demo.uiSchemaCode}
                  onChange={handleUISchemaChange}
                  title="UISchema"
                  class={classes.editor}
                />
                <MonacoEditor
                  code={demo.dataCode}
                  onChange={handleDataChange}
                  title="value"
                  class={classes.editor}
                />
              </div>
            </div>
            <div class={classes.form}>
              <SchemaForm
                schema={demo.schema}
                rootSchema={demo.schema}
                onChange={handleChange}
                value={demo.data}
              />
            </div>
          </div>
        </div>
      )
    }
  },
})
