<template>
	<div class="k-inp k-flex" :class="{'k-inp_atv':isAtv}">
		<label class="k-inp-label">{{label}}：</label>
		<div class="k-flex-item k-inp-ct">
			<input 
				ref="inp"
				class="k-inp-input" 
				:type="type" 
				:placeholder="placeholder"
				:tabindex="tab"
				:value="value"
				:disabled="disabled"
				@focus="onfocus"
				@blur="onBlur"
				@input="onChange"
			/>
		</div>
		
		<button class="k-inp-code" v-if="hasCode" @click="onSendCode">{{codeText}}</button>
	</div>
</template>
<script>
export default {
    props: {
        tab: {
            type: Number,
            default: 1
        },
        label: {
            type: String,
            default: "标签"
        },
        type: {
            type: String,
            default: "text"
        },
        value: String,
        placeholder: String,
		hasCode: Boolean,
		disabled:Boolean
    },
    data() {
        return {
            isAtv: false,
            codeText: "获取验证码"
        };
    },
    methods: {
        onfocus(e) {
			this.isAtv = true;
			window.addEventListener("touchmove",this.blur);
        },
        onBlur(e) {
            this.isAtv = false;
			this.$emit("blur");
			window.removeEventListener("touchmove",this.blur);
        },
        onSendCode() {
            if (
                !(
                    this.codeText === "获取验证码" ||
                    this.codeText === "重新发送"
                )
            ) {
                return;
            }
			this.codeText="发送中...";
            this.$emit("sendCode", msg => {
                this.stop(msg);
			},()=>{
				this.runCodeSec();
			});
			
        },
        stop(msg = "重新发送") {
            clearInterval(this.time);
            this.codeText = msg;
            this.num = 60;
        },
        runCodeSec() {
            clearInterval(this.time);
			this.num = 60;
			this.codeText =`倒计时 ${this.num} s`

            this.time = setInterval(() => {
                this.num--;
                if (this.num < 1) {
                    this.codeText = "重新发送";
                    clearInterval(this.time);
                    return;
                }
                this.codeText =`倒计时 ${this.num} s`
            }, 1000);
        },
        onChange(e) {
            this.$emit("input", e.target.value);
		},
		blur(e){
			if(e.target!==this.$refs.inp){
				this.$refs.inp.blur();
			}
			
		}
    },
    beforeDestroy() {
        clearInterval(this.time);
    }
};
</script>
<style>
.k-inp {
    width: 5.05rem;
    padding: 0.16rem 0;
    padding-right: 0.3rem;
    border: 1px solid #c6a05c;
    border-radius: 0.15rem;
    margin: auto;
    margin-bottom: 0.2rem;
	box-sizing: border-box;
	background:rgba(0,0,0,.2)
}
.k-inp .k-inp-ct{
	height: .4rem;
	line-height: .4rem;
}
.k-inp label.k-inp-label {
	display: block;
    padding-left: 0.3rem;
    border-left: 2px solid transparent;
    font-size: 0.28rem;
    color: #c6a05c;
    transition: all 0.5s;
}
.k-inp_atv label.k-inp-label {
    border-color: #ffae00;
}
.k-inp input.k-inp-input {
	width:100%;
	height: 100%;
	font-size: .22rem;
    border: none;
    outline: none;
	background: none;
	color:#c6a05c
}
.k-inp button.k-inp-code {
	display: block;
    width: 1.25rem;
    height: 0.4rem;
    border: 1px solid #ffae00;
    border-radius: 0.1rem;
    font-size: 0.18rem;
    background: none;
    outline: none;
    color: #d5951d;
    transition: all 0.2s;
	white-space: nowrap;
	overflow: hidden;
}
.k-inp button.k-inp-code:active {
    transform: scale(0.8);
    opacity: 0.5;
}
::-webkit-input-placeholder{
	color:rgba(255,255,255,.4)
}
</style>

