<template>
  <div class="shop-item">
    <h2 class="shop-item-title">{{item.name}}</h2>
    <img class="shop-item-img" :src="item.img">
    <div class="shop-item-info">
      <div class="shop-item-desc">{{item.desc}}</div>
      <div class="shop-item-price">${{item.price}}</div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    item: {
      type: Object,
      required: true
    }
  }
};
</script>

<style>
.shop-item {
  width: 25vw;
  margin: 5px;
  border-radius: 10px;
  background-image: linear-gradient(to bottom right, #ff00ea77, #ffc4007e);
  padding: 20px;
}
.shop-item-img {
  width: 100%;
  border-radius: 3px;
  /* margin: 0 10%; */
}

.shop-item-info {
  display: flex;
  justify-content: space-between;
}

.shop-item-desc {
  margin-right: 20px;
}
.shop-item-price {
  font-weight: bold;
}
</style>
