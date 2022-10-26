<script>

import Vertical from "./vertical";

export default {
    components: {
        Vertical,
    },
    data() {
        return {};
    },
};
</script>

<template>
<div>
    <Vertical layout="vertical">
        <slot />
    </Vertical>
</div>
</template>
