/**
 * Copyright (c) Egret-Labs.org. Permission is hereby granted, free of charge,
 * to any person obtaining a copy of this software and associated documentation
 * files (the "Software"), to deal in the Software without restriction, including
 * without limitation the rights to use, copy, modify, merge, publish, distribute,
 * sublicense, and/or sell copies of the Software, and to permit persons to whom
 * the Software is furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included
 * in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED,
 * INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR
 * PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE
 * FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE,
 * ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

/// <reference path="../components/SkinnableComponent.ts"/>
/// <reference path="../core/IContainer.ts"/>
/// <reference path="../core/IStateClient.ts"/>
/// <reference path="../core/IVisualElement.ts"/>
/// <reference path="OverrideBase.ts"/>

module ns_egret {

	/**
	 * @class ns_egret.AddItems
	 * @classdesc
	 * 添加显示元素
	 * @extends ns_egret.OverrideBase
	 */	
	export class AddItems extends OverrideBase {
		/**
		 * 添加父级容器的底层
		 * @constant ns_egret.AddItems.FIRST
		 */		
		public static FIRST:string = "first";
		/**
		 * 添加在父级容器的顶层 
		 * @constant ns_egret.AddItems.LAST
		 */		
		public static LAST:string = "last";
		/**
		 * 添加在相对对象之前 
		 * @constant ns_egret.AddItems.BEFORE
		 */		
		public static BEFORE:string = "before";
		/**
		 * 添加在相对对象之后 
		 * @constant ns_egret.AddItems.AFTER
		 */		
		public static AFTER:string = "after";
		
		/**
		 * 构造函数
		 * @method ns_egret.AddItems#constructor
		 */		
		public constructor(){
			super();
		}
		
		/**
		 * 要添加到的属性 
		 * @member ns_egret.AddItems#propertyName
		 */		
		public propertyName:string = "";
		
		/**
		 * 添加的位置 
		 * @member ns_egret.AddItems#position
		 */		
		public position:string = AddItems.LAST;
		
		/**
		 * 相对的显示元素的实例名
		 * @member ns_egret.AddItems#relativeTo
		 */		
		public relativeTo:string;
		
		/**
		 * 目标实例名
		 * @member ns_egret.AddItems#target
		 */		
		public target:string;
		
		/**
		 * @method ns_egret.AddItems#initialize
		 * @param parent {IStateClient} 
		 */
		public initialize(parent:IStateClient):void{
			var targetElement:IVisualElement = <IVisualElement> (parent[this.target]);
			if(!targetElement||targetElement instanceof SkinnableComponent)
				return;
			//让UIAsset等素材组件立即开始初始化，防止延迟闪一下或首次点击失效的问题。
			if("_initialize" in targetElement){
				try{
					targetElement["_initialize"]();
				}
				catch(e){
				}
			}
		}
		
		/**
		 * @method ns_egret.AddItems#apply
		 * @param parent {IContainer} 
		 */
		public apply(parent:IContainer):void{
			var index:number;
			var relative:IVisualElement;
			try{
				relative = <IVisualElement> (parent[this.relativeTo]);
			}
			catch(e){
			}
			var targetElement:IVisualElement = <IVisualElement> (parent[this.target]);
			var dest:IContainer = <IContainer> (this.propertyName?parent[this.propertyName]:parent);
			if(!targetElement||!dest)
				return;
			switch (this.position){
				case AddItems.FIRST:
					index = 0;
					break;
				case AddItems.LAST:
					index = -1;
					break;
				case AddItems.BEFORE:
					index = dest.getElementIndex(relative);
					break;
				case AddItems.AFTER:
					index = dest.getElementIndex(relative) + 1;
					break;
			}    
			if (index == -1)
				index = dest.numElements;
			dest.addElementAt(targetElement,index);
		}
		
		/**
		 * @method ns_egret.AddItems#remove
		 * @param parent {IContainer} 
		 */
		public remove(parent:IContainer):void{
			var dest:IContainer = this.propertyName==null||this.propertyName==""?
				<IContainer> parent:parent[this.propertyName];
			var targetElement:IVisualElement = <IVisualElement> (parent[this.target]);
			if(!targetElement||!dest)
				return;
			if(dest.getElementIndex(targetElement)!=-1){
				dest.removeElement(targetElement);
			}
		}
	}
	
}