<template>
  <div class="shop">
    <h1>Shop</h1>
    <input @keyup.enter="search" v-model="query">
    <button type="submit">Search</button>
    <div class="items">
      <ShopItem :key="item.id" :item="item" v-for="item in items"/>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import ShopItem from "@/components/ShopItem";

export default {
  name: "shop",
  components: {
    ShopItem
  },
  data() {
    return {
      rawItems: [],
      query: ""
    };
  },
  methods: {
    async search() {
      this.rawItems = (await axios.get(
        "https://jsonplaceholder.typicode.com/posts",
        {
          params: { userId: this.query }
        }
      )).data;
    }
  },
  async created() {
    this.rawItems = (await axios.get(
      "https://jsonplaceholder.typicode.com/posts"
    )).data;
  },
  computed: {
    items() {
      return this.rawItems.map(post => {
        post.name = post.title;
        post.img = "https://www.w3schools.com/css/img_5terre.jpg";
        post.desc =
          " Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex, porro eveniet quis necessitatibus, fugiat, tempore in aliquam doloribus dolores cupiditate rerum explicabo. Velit, adipisci, qui facilis voluptatibus numquam magnam perferendis sit totam quibusdam porro obcaecati sequi autem excepturi? Nam totam illo aut repellat porro sed, hic autem sunt dolorem accusamus aliquam nisi mollitia suscipit consectetur quaerat quod est aliquid repudiandae nulla pariatur, modi eaque? Vitae, minima quam. Obcaecati praesentium quod adipisci est? Quidem mollitia magnam magni. Explicabo porro tenetur ipsam ratione assumenda vel sint exercitationem eius. Vitae recusandae ipsa eos labore magni, modi quibusdam culpa, ut tempore illo illum eaque!";
        post.price = 99;
        return post;
      });
    }
  }
};
</script>

<style>
.items {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  margin: 0;
}
</style>

