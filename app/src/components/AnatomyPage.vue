<script setup lang="ts">
import { computed, watchEffect } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { defaultLanguage, languages } from '../data'
import type { ExampleVariant } from '../lib/types'
import AnatomyView from './AnatomyView.vue'

const route = useRoute()
const router = useRouter()

const language = computed(
  () => languages.find((lang) => lang.id === route.params.langId) ?? defaultLanguage,
)
const variant = computed<ExampleVariant>(() =>
  route.params.variant === 'verbose' ? 'verbose' : 'minimal',
)

// Normalize garbage URLs (e.g. /#/nope/wat) back to a real route.
watchEffect(() => {
  const { langId, variant: v } = route.params
  const langOk = !langId || languages.some((lang) => lang.id === langId)
  const variantOk = !v || v === 'minimal' || v === 'verbose'
  if (!langOk || !variantOk) {
    router.replace(`/${language.value.id}/${variant.value}`)
  }
})

function setVariant(value: ExampleVariant) {
  router.push(`/${language.value.id}/${value}`)
}
</script>

<template>
  <AnatomyView :language="language" :variant="variant" @set-variant="setVariant" />
</template>
