// 第一种方式，首页访问页面时加载main.ja 2mb，当页面逻辑发生变化时，又要加载2mb的内容

// 业务逻辑 1mb 同步代码
// import _ from 'lodash';
// var element = document.createElement('div');
// 		element.innerHTML=_.join(['Dell','Su'],'_');
// 		document.body.appendChild(element);

// console.log(_.join(['a','b','c','***']));

// 此处圣罗10万行代码
// console.log(_.join(['a','b','c','***']));

// 第二种方式异步代码
// main.js被拆成lodash.js(1mb),main.js(1mb),当页面逻辑发生变化时，只要加载main.js即可(1mb)


// code Splitting

// function getComponent(){
// 	return import(/*webpackChunkName:"lodash"*/'lodash').then(({default:_})=>{
// 		var element = document.createElement('div');
// 		element.innerHTML=_.join(['Dell','Su'],'_');
// 		return element;
// 	})
// }
// getComponent().then(element=>{
// 		document.body.appendChild(element);
// 	})
// css分割
import "./style.css";
import "./style1.css";
// 懒加载
async function getComponent(){
	// 懒加载
	const { default: _ }=await import(/*webpackChunkName:"lodash"*/'lodash');
		const element = document.createElement('div');
		element.innerHTML=_.join(['Dell','Su'],'-');
		return element;

}
document.addEventListener('click',()=>{
	getComponent().then(element=>{
		document.body.appendChild(element);
	})
})	

// document.addEventListener('click',()=>{
// 	import (webpackPrefetch: true './click.js').then(({default: func })=>{
// 		func();
// 	})
// })
// import test from './test.js';
// console.log(test.name);