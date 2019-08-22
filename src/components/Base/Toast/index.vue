<template>
	<transition name="toast-fade">
		<p class="toast" v-if="message&&message.msg" :key="message.time" @click="close">
            <span>{{message.msg}}</span>
        </p>
	</transition>
</template>
<script>
export default {
    computed: {
        message() {
            return this.$store.state.Toast.message;
        },
        preList() {
            return this.$store.state.Toast.preList;
        }
    },
    watch: {
        message(value) {
            if (value) {
                clearTimeout(this.time);
                this.time = setTimeout(() => {
                    this.close();
                }, 3000);
            }
        }
    },
    methods: {
        close() {
			if(this.message&&this.message.msg){
				this.$store.commit("Toast/shift")
            
			}
			clearTimeout(this.time);
            
        },
        begin() {
            this.time = setTimeout(() => {
                this.close();
            }, 3000);
        }
	},
	mounted(){
		window.addEventListener("touchstart",this.close);
	},
	beforeDestroy(){
		clearTimeout(this.time);
		window.removeEventListener("touchstart",this.close);
	}
};
</script>
<style>
.toast {
	position: fixed;
    top: 50%;
    left: 50%;
    z-index: 800;
    max-width: 6rem;
	line-height: 0.56rem;
	padding: 0 .3rem;
    border-radius: 0.1rem;
    margin: auto;
    margin-top: -0.3rem;
    background: rgba(0,0,0,.8);
    color: #fff;
    text-align: center;
    font-size: 0.28rem;
	box-shadow: 0 0 0.5rem rgba(0, 0, 0, 0.5);
	transform: translateX(-50%)

}
.toast-fade-enter-active {
    transition: all 0.3s ease;
}
.toast-fade-leave-active {
    transition: all 0.3s cubic-bezier(1, 0.5, 0.8, 1);
}
.toast-fade-enter {
    opacity: 0;
    transform: translate(-50%,50%);
}
.toast-fade-leave-to {
    opacity: 0;
    transform:  translate(-50%,-50%)
}
</style>
