<template>
  <div style="max-width:720px;margin:24px auto;font-family:Arial,Helvetica,sans-serif">
    <h1>Agenda de Contatos</h1>

    <div v-if="view === 'home'">
      <button @click="view = 'new'" style="margin-right: 12px;">Cadastrar Contato</button>
      <button @click="carregaContatos()">Ver Contatos</button>
    </div>

    <NovoContato v-if="view === 'new'" @cancel="view = 'home'" @saved="onSaved" />

    <VerContatos v-if="view === 'list'" :contatos="contatos" @back="view = 'home'" />
  </div>
</template>

<script>
import { ref } from 'vue'
import NovoContato from './components/NovoContato.vue'
import VerContatos from './components/VerContatos.vue'

export default {
  components: { NovoContato, VerContatos },
  setup() {
    const view = ref('home')
    const contatos = ref([])

    async function carregaContatos() {
      const res = await fetch('http://localhost:3000/contatos')
      contatos.value = await res.json()
      view.value = 'list'
    }

    function onSaved() {
      view.value = 'home'
    }

    return { view, contatos, carregaContatos, onSaved }
  }
}
</script>
