/**
 * 在模板中使用
 * 1. 加载需要的参数列表： import { arg1, arg2, arg3 } from './argv';
 * 2. 嵌入代码参数中：codes={[arg1]: `echo "${arg1}";`}...
 **/

const random = () => `0x${(Math.random() + Math.random()).toString(16).substr(2)}`;

export const arg1 = random();
export const arg2 = random();
export const arg3 = random();
export const arg4 = random();
export const arg5 = random();
export const arg6 = random();