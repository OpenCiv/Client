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
                    width: 150px;
                    float: left;
                    padding: 4px;
                    margin-right: 24px;
                    background-color: #555;
                    border-radius: 5px;
                    -webkit-border-radius: 5px;
                    -moz-border-radius: 5px;
                    display: flex;
                    align-items: center;
                    .back-stone;
                    .box-shadow;
                    .border-stone-thin;
                    .clearfix;

                    .button {
                        float: left;
                    }
                    h3 {
                        display: block;
                        width: 90px;
                        float: left;
                        font-size: 0.9em;
                        margin: 4px 0 2px 8px;
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

    .item-icon {
        height: 36px;
        width: 36px;
        min-height: 36px;
        min-width: 36px;
        box-sizing: border-box;
        padding: 0px;
        color: @color_negatext;
        letter-spacing: 0px;
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
                <h3>Material</h3>
                <div class="item-card">
                    <div class="item-icon" title="Item">
                        <img src="img/resources/wood.svg" alt="Item icon">
                    </div>
                    <h3>Wood</h3>
                </div>
                <div class="item-card">
                    <div class="item-icon" title="Item">
                        <img src="img/resources/stone.svg" alt="Item icon">
                    </div>
                    <h3>Stone</h3>
                </div>
                <div class="item-card">
                    <div class="item-icon" title="Item">
                        <img src="img/resources/bronze.svg" alt="Item icon">
                    </div>
                    <h3>Bronze</h3>
                </div>
            </div>

            <div class="item-wrapper">
                <h3>Weapons</h3>
                <div class="item-card">
                    <div class="item-icon" title="Item">
                        <img src="img/resources/spear_wood.svg" alt="Item icon">
                    </div>
                    <h3>Wooden spear</h3>
                </div>
                <div class="item-card">
                    <div class="item-icon" title="Item">
                        <img src="img/resources/sword_iron.svg" alt="Item icon">
                    </div>
                    <h3>Iron sword</h3>
                </div>
                <div class="item-card">
                    <div class="item-icon" title="Item">
                        <img src="img/resources/sword_copper.svg" alt="Item icon">
                    </div>
                    <h3>Copper sword</h3>
                </div>
            </div>
        </div>
    </div>
</div>