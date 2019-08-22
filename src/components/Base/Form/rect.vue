<template>
    <div class="k-rect k-flex">
        <label>{{ label }}</label>
        <div class="k-rect-bd k-flex-item">
            <slot />
        </div>
        <div class="k-rect-ft">
            <slot name="ft" />
        </div>
    </div>
</template>
<script>
    export default {
        props: {
            label: {
                type: String,
                default: ""
            }
        }
    };
</script>
<style lang="less">
    .k-rect {
        box-sizing: border-box;
        width: 100%;
        height: 100%;
        padding-left: 0.37rem;
        padding-right: 0.2rem;
        .k-flex-item {
            padding-left: 0.34rem;
            height: 0.52rem;
            border-radius: 0.1rem;
        }
        label {
            display: block;
        }
    }
</style>

