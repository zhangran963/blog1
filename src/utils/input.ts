import { reactive } from 'vue'

/**
 * Record: 对象的(全部)键值对
 * SomeRecord: 对象的(某些)键值对
 */
type SomeRecord<K extends keyof any, T> = {
  [P in K]?: T
}

type InputStateMap =
  | 'type'
  | 'value'
  | 'name'
  | 'placeholder'
  | 'maxlength'
  | 'minlength'

interface IInputState {
  type?: string
  value: string
  name?: string
  placeholder?: string
  minlength?: number
  maxlength?: number
}
/**
 * 生成InputElement用到的一般属性
 */
export function useInputState(props: IInputState) {
  const state = reactive({
    type: 'text',
    placeholder: '',
    minlength: 6,
    maxlength: 15,
    ...props,
  })

  // const state = reactive({
  //   ...props,
  // })

  return {
    state,
  }
}
