<<template>
<div class="my-5">
    <b-container>
        <h1 class="head">Vending Machine</h1>
        <b-row class="my-5">
            <Beverage/>
        </b-row>
    </b-container>
</div>
</template>

<script>
import Beverage from '@/components/Beverage'
export default {
    components: {
      Beverage
    }
}
</script>

<style>
body{
  background-color: crimson;
}
  .head{
    text-align: center;
    font-weight: bold;
    color: white;
  }
</style>
