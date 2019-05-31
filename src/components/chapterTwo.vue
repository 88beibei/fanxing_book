<template>
	<div
		id="content"
		ref="screen"
		v-touch:swipeleft.stop="onLeft"
		v-touch:swiperight.stop="onRight"
		@click="click($event)"
	>
		<div
			class="screen"
			v-for="pageIndex in pages"
			:key="pageIndex"
			v-show="!content.turnIndex || content.turnIndex == pageIndex"
			:ref="`page_${pageIndex}`"
			:style="{
				'z-index': getZIndex(type, pageIndex),
				transform: pageMove(type, pageIndex),
				transition: type == 2 && 'transform 0.3s',
				'backgroundColor': bgColor
			}"
		>
			<div
				v-html="content.content"
				:style="{
					columns: `${width}px ${pages}`,
					'column-gap': '0.2rem',
					transform: `translateX(-${(pageIndex - 1) * width}px)`
				}"
			></div>
		</div>
		<div class="hidden" ref="height" v-html="content.content"></div>
	</div>
</template>

<script>
import { setTimeout, clearTimeout } from 'timers';

export default {
	name: 'home',
	props: ['content', 'chapterIndex', 'type', 'bgColor', 'chapter','totalCount'],
	data() {
		return {
			isMounted: 0,//加载完成
			turnType: '',//滑动中 下一页next  上一页 prev
			tiemr: null,//翻页完成延时器
			pages: 0
		}
	},
	computed: {
		width() {
				return this.$refs.height.clientWidth;
		},
		height() {
				return this.$refs.screen.clientHeight;
		}
	},
	methods: {
		getZIndex(type, pageIndex) {//层级关系
			let { page } = this.content;
			if (type == 1 || !this.turnType) {
				return page == pageIndex ? 2 : 1;
			} else if (type == 2) {//翻页中
				if (this.turnType == 'next') {//下一页  上一页滑动
					return page - 1 == pageIndex ? 3 : this.getZIndex(1, pageIndex);
				} else {//上一页  下一页滑动
					return page + 1 == pageIndex ? 3 : this.getZIndex(1, pageIndex);
				}
			}
		},
		pageMove(type, pageIndex) {//滑动动画
			let { page, turnIndex } = this.content;
			var move = {
				next: 'translate3d(-100%, 0, 0)',
				prev: 'translate3d(100%, 0, 0)'
			}
			//向后翻页
			if (type == 2) {
				//下一页
				if (page - 1 == pageIndex && this.turnType == 'next') {
					return move.next;
				} else if (page + 1 == pageIndex && this.turnType == 'prev') {
					return move.prev;
				}
				if (turnIndex == 1 && turnIndex == pageIndex) {
					return move.prev;
				} else if (this.pages && turnIndex == this.pages && turnIndex == pageIndex) {
					return move.next;
				}

			}
		},
		onLeft() {//左滑 下一页
			let { page, turnIndex } = this.content;
			console.log(this.chapterIndex, page)
			if (this.timer || (page > this.pages)) return false;//防止重复滑动
			if (page == this.pages) {//最后一页滑动
				this.$emit('pageNext');
			}
			let type = this.type;
			if (type == 2 && (this.chpater != this.totalCount) && (page != this.pages)) {
				this.$emit('changePage', this.chapterIndex, page + 1, this.pages);
				this.turnType = 'next';
				this.moveDone();
			}
		},
		onRight() {//右滑 上一页
			let { page, turnIndex } = this.content;
			console.log(this.chapterIndex, page)
			if (this.timer || (page < 1)) return false;
			if (page == 1) {
				this.$emit('pagePrev', this.chapterIndex);
			}
			let type = this.type;
			if (type == 2 && this.chpater != 1 && page != 1) {
				this.$emit('changePage', this.chapterIndex, page - 1, this.pages);
				this.turnType = 'prev';
				this.moveDone();
			}
		},
		moveDone() {//移动结束
			clearTimeout(this.tiemr);
			this.timer = null;
			this.tiemr = setTimeout(_ => {
				this.turnType = '';
			}, 300);
		},
		click() {
			this.$emit('showSet');
		}

	},
	mounted() {
		// let 'page', 'content', 'chapterIndex', 'turnIndex', 'type', 'isPaged'
		let { page, isPaged, prev, loading } = this.content;
		this.pages = Math.ceil(this.$refs.height.clientHeight / (this.$refs.screen.clientHeight - 20));
				//上一章 最后一页
		if(!isPaged){
			this.$emit('changePage', this.chapterIndex, page, this.pages);
		}
	},
	updated(){
		let { page, isPaged, prev, loading } = this.content;
		if(!this.pages){
			this.pages = Math.ceil(this.$refs.height.clientHeight / (this.$refs.screen.clientHeight - 20));
					//上一章 最后一页
			if(!isPaged){
				this.$emit('changePage', this.chapterIndex, page, this.pages);
			}
		}
	}
}
</script>
<style lang="less" scoped>
@padding: 0.1rem;
#content {
	height: 100%;
	overflow: hidden;
	font-size: 0.16rem;
	position: relative;
	touch-action: none;
	.hidden {
		padding: 0 @padding;
		width: 100%;
		word-wrap: break-word;
		position: absolute;
		z-index: -1;
		opacity: 0;
		box-sizing: border-box;
	}
	.screen {
		width: 100%;
		height: 100%;
		overflow: hidden;
		// background-color: #faf9de;
		position: absolute;
		div {
			padding: @padding;
			height: 100%;
			word-wrap: break-word;
			box-sizing: border-box;
		}
	}
}
</style>
<style lang="less">
#content {
	p {
		text-indent: 2em;
		line-height: 1.5em;
		margin-top: 0;
		margin-bottom: 1.5em;
	}
	.catalog {
		padding: 1.5em 0;
		font-size: 0.8em;
	}
	li {
		border-bottom: 1px solid #d5d5d5;
	}
	h1 {
		font-size: 1.6em;
		font-weight: bold;
	}
	h2 {
		display: block;
		font-size: 1.2em;
		font-weight: bold;
		margin-bottom: 0.83em;
		margin-left: 0;
		margin-right: 0;
		margin-top: 1em;
	}
	.mbppagebreak {
		display: block;
		margin-bottom: 0;
		margin-left: 0;
		margin-right: 0;
		margin-top: 0;
	}
	a {
		color: inherit;
		text-decoration: none;
		cursor: default;
	}
	a[href] {
		color: blue;
		text-decoration: none;
		cursor: pointer;
	}

	.italic {
		font-style: italic;
	}
}
</style>



