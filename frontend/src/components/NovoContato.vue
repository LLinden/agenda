<template>
  <div>
    <h2>Cadastrar Contato</h2>
    <form @submit.prevent="confirm">
      <div><label>Nome<br><input v-model="form.nome" required /></label></div>
      <div><label>Telefone<br><input v-model="form.telefone" required /></label></div>
      <div><label>Email<br><input v-model="form.email" type="email" /></label></div>
      <div><label>Cidade<br><input v-model="form.cidade" /></label></div>
      <div><label>Estado<br><input v-model="form.estado" /></label></div>
      <div style="margin-top:12px; display:flex; gap:12px; justify-content:center;">
        <button type="submit">Confirmar</button>
        <button type="button" @click="$emit('cancel')">Voltar</button>
      </div>
    </form>
    <p v-if="message">{{message}}</p>
  </div>
</template>

<script>
import { reactive, ref } from 'vue'
export default {
  emits: ['cancel','saved'],
  setup(_, { emit }){
    const form = reactive({ nome:'', telefone:'', email:'', cidade:'', estado:'' })
    const message = ref('')
    async function confirm(){
      try {
        const res = await fetch('http://localhost:3000/contatos', {
          method: 'POST',
          headers: { 'Content-Type':'application/json' },
          body: JSON.stringify(form)
        });
        if (!res.ok) {
          const err = await res.json().catch(()=>({error:'Erro'}))
          message.value = 'Erro: ' + (err.error || res.statusText)
          return
        }
        message.value = 'Contato salvo com sucesso!'
        emit('saved')
      } catch (e) {
        message.value = 'Erro ao conectar com a API'
      }
    }
    return { form, confirm, message }
  }
}
</script>
