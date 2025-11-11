<template>
  <div>
    <h2>Contatos</h2>
    <div v-if="!contatos || contatos.length===0">Nenhum contato cadastrado.</div>
    <table v-else border="1" cellpadding="6" cellspacing="0">
      <thead><tr><th>Nome</th><th>Telefone</th><th>Email</th><th>Cidade</th><th>Estado</th></tr></thead>
      <tbody>
        <tr v-for="c in contatos" :key="c.id">
          <td>{{c.nome}}</td>
          <td>{{c.telefone}}</td>
          <td>{{c.email}}</td>
          <td>{{c.cidade}}</td>
          <td>{{c.estado}}</td>
        </tr>
      </tbody>
    </table>
    <div style="margin-top:8px"><button @click="$emit('back')">Voltar</button></div>
  </div>
</template>

<script>
export default {
  props: ['contatos']
}
</script>
