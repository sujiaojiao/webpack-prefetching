function getComponent(){
	// 懒加载
	const element = document.createElement('div');
	element.innerHTML='Dell Su';
	document.body.appendChild(element);

}

export default getComponent;