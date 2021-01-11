<style lang="less">
    @import url("../less/layout.less");

    #inventory-container {
        width: auto;
        overflow-x: scroll;
        overflow-y: scroll;
        margin: 0 12px 12px 12px;

        #inventory {
            width: max-content;
            .clearfix;

            .item-wrapper {
                padding: @pad2 @pad1;
                .clearfix;

                .item-card {
                    position: relative;
                    width: 100px;
                    float: left;
                    padding: 4px;
                    margin-right: 24px;
                    background-color: #555;
                    border-radius: 5px;
                    -webkit-border-radius: 5px;
                    -moz-border-radius: 5px;
                    align-items: center;
                    .back-stone;
                    .box-shadow;
                    .border-stone-thin;
                    .clearfix;

                    .item-icon {
                        width: 40%;
                        float: left;
                        box-sizing: border-box;
                        color: @color_negatext;
                        letter-spacing: 0px;
                        padding-left: 0.25em;
                        //margin: 0.05em 0 0 0;
                    }

                    .amount {
                        box-sizing: border-box;
                        display: block;
                        width: 60%;
                        text-align: center;
                        line-height: 150%;
                        float: left;
                        font-size: 24px;
                        font-weight: 700;
                        margin: 0.05em 0 0 0;
                        padding: 0 0.25em 0 0.25em;
                    }
                }

                .item-card:last-of-type {
                    margin-right: 0;
                }

                .item-card:hover {
                    cursor: pointer;
                    background-color: #777777;
                    border-top-color: #999999;
                }

                .item-card.unavailable {
                    background-color: #333;

                    h3 {
                        color: #777;
                    }
                }

                .item-card.unavailable:hover {
                    cursor: default;
                    background-color: #333;
                    border-top-color: #777;
                }
            }
        }
    }

    

    .unavailable .item-icon {
        border-color: darken(@color_text, 30%);
        background-color: darken(@color_text,40%);

        img {
            -webkit-filter: grayscale(100%) brightness(50%);
            filter: grayscale(100%) brightness(50%);
        }
    }

    .owned .iconbutton, .owned .iconbutton:visited, .owned .iconbutton:hover {
        border-color: @color_light;
        background-color: @color_normal;
    }

</style>

<script>
import { createEventDispatcher } from 'svelte';

const dispatch = createEventDispatcher();

function close() {
   dispatch('close');
}
</script>

<div class="popup">
    <button class="hyperlink closewindow" title="Close" on:click={close}>
        <img class="tiny-icon" src="img/menuicons/close.svg" alt="Close window">
    </button>
    <h2 class="center"><img src="img/menuicons/display_inventory.svg" alt="Items" class="tiny-icon"> Inventory</h2>
    <div id="inventory-container">
        <div id="inventory">
            <div class="item-wrapper">
                <h3>Influence</h3>
                <div class="item-card">
                    <div class="item-icon" title="Wealth">
                        <img src="img/resources/wealth.svg" alt="Wealth">
                    </div>
                    <p class="amount">192.<small>5</small></p>
                </div>
            </div>

            <div class="item-wrapper">
                <h3>Material</h3>
                <div class="item-card">
                    <div class="item-icon" title="Wood">
                        <img src="img/resources/wood.svg" alt="Wood">
                    </div>
                    <p class="amount">25.<small>5</small></p>
                </div>
                <div class="item-card">
                    <div class="item-icon" title="Stone">
                        <img src="img/resources/stone.svg" alt="Stone">
                    </div>
                    <p class="amount">12</p>
                </div>
                <div class="item-card">
                    <div class="item-icon" title="Bronze">
                        <img src="img/resources/bronze.svg" alt="Bronze">
                    </div>
                    <p class="amount">999</p>
                </div>
            </div>

            <div class="item-wrapper">
                <h3>Weapons</h3>
                <div class="item-card">
                    <div class="item-icon" title="Wooden spear">
                        <img src="img/resources/spear_wood.svg" alt="Wooden spear">
                    </div>
                    <p class="amount">4</p>
                </div>
                <div class="item-card">
                    <div class="item-icon" title="Iron sword">
                        <img src="img/resources/sword_iron.svg" alt="Iron sword">
                    </div>
                    <p class="amount">1</p>
                </div>
                <div class="item-card">
                    <div class="item-icon" title="Copper sword">
                        <img src="img/resources/sword_copper.svg" alt="Copper sword">
                    </div>
                    <p class="amount">2</p>
                </div>
            </div>
        </div>
    </div>
</div>