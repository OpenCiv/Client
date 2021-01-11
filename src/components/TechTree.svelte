<style lang="less">
    @import url("../less/layout.less");

    @-webkit-keyframes researchGradient {
        0%{background-position:100% 0%}
        50%{background-position:0% 100%}
        100%{background-position:100% 0%}
    }
    @-moz-keyframes researchGradient {
        0%{background-position:100% 0%}
        50%{background-position:0% 100%}
        100%{background-position:100% 0%}
    }
    @keyframes researchGradient {
        0%{background-position:100% 0%}
        50%{background-position:0% 100%}
        100%{background-position:100% 0%}
    }

    #techtree-container {
        width: auto;
        overflow-x: scroll;
        overflow-y: scroll;
        margin: 0 12px 12px 12px;

        #techtree {
            width: max-content;
            .clearfix;

            .tech-era {
                border-right: 2px solid #777;
                width: auto;
                float: left;

                .tech-path {
                    padding: @pad2 @pad1;
                    background-image: url("../img/menuicons/dashed_line_horizontal.svg");
                    background-repeat: repeat-x;
                    background-position: left;
                    background-size: 24px;
                    .clearfix;

                    .tech-card {
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

                        button {
                            float: left;
                        }
                        h3 {
                            display: block;
                            width: 90px;
                            float: left;
                            font-size: 0.9em;
                            margin: 4px 0 2px 8px;
                        }

                        .tech-upgrades {
                            display: none;
                            background-color: #555;

                            width: 150px;
                            position: absolute;
                            top: 0;
                            left: 150px;
                            z-index: 100;

                            font-size: 0.7em;

                            .back-stone;
                            .border-stone-thin;

                            img {
                                width: 3.5em;
                                float: left;
                                margin: 0 0.75em 1em 1em;
                            }

                            h4 {
                                margin: 1em 1em 0 0.75em;
                                line-height: 110%;
                            }

                            p {
                                margin: 0 1em 1.25em 0.75em;
                                line-height: 110%;
                            }
                        }
                    }

                    .tech-card:last-of-type {
                        margin-right: 0;
                    }

                    .tech-card:hover {
                        cursor: pointer;
                        background-color: #777777;
                        border-top-color: #999999;

                        .tech-upgrades {
                            display: block;
                        }
                    }

                    .tech-card.unavailable {
                        background-color: #333;

                        h3 {
                            color: #777;
                        }
                    }

                    .tech-card.unavailable:hover {
                        cursor: default;
                        background-color: #333;
                        border-top-color: #777;
                    }
                }
            }

            .tech-era:first-of-type {
                .tech-path {
                    background-repeat: no-repeat;
                    background-position-x: right;
                }
            }

            .tech-era:last-of-type {
                border-right: 0 none transparent;

                .tech-path {
                    background-repeat: no-repeat;
                    background-position-x: left;
                }
            }
        }
    }

    .iconbutton, .iconbutton:visited, .iconbutton:hover {
        height: 36px;
        width: 36px;
        min-height: 36px;
        min-width: 36px;
        box-sizing: border-box;
        padding: 0px;
        border-color: @color_text;
        color: @color_negatext;
        background-color: darken(@color_text,10%);
        letter-spacing: 0px;
    }

    .unavailable .iconbutton, .unavailable .iconbutton:visited, .unavailable .iconbutton:hover {
        border-color: darken(@color_text, 30%);
        background-color: darken(@color_text,40%);

        img {
            -webkit-filter: grayscale(100%) brightness(50%);
            filter: grayscale(100%) brightness(50%);
        }
    }

    .researched .iconbutton, .researched .iconbutton:visited, .researched .iconbutton:hover {
        border-color: @color_light;
        background-color: @color_normal;
    }

    .current-research .iconbutton, .current-research .iconbutton:visited, .current-research .iconbutton:hover {
        border-color: @color_research;
        //background: darken(@color_research,10%);
        background: -moz-linear-gradient(45deg, darken(@color_research,2%), darken(@color_research,25%), darken(@color_research,2%));
        background: -webkit-linear-gradient(45deg, darken(@color_research,2%), darken(@color_research,25%), darken(@color_research,2%));
        background: linear-gradient(45deg, darken(@color_research,2%), darken(@color_research,25%), darken(@color_research,2%));
        background-size: 400% 400%;

        -webkit-animation: researchGradient 5s infinite;
        -moz-animation: researchGradient 5s infinite;
        animation: researchGradient 5s infinite;
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
    <h2 class="center"><img src="img/resources/science.svg" alt="Science" class="tiny-icon"> Research</h2>
    <div id="techtree-container">
        <div id="techtree">
            <div class="tech-era">
                <h3>Prehistoric Age</h3>
                <div class="tech-path">
                    <div class="tech-card current-research">
                        <div class="button iconbutton" title="Technology">
                            <img src="img/resources/production.svg" alt="Tech icon">
                        </div>
                        <h3>Stone Tools</h3>
                        <div class="tech-upgrades">
                            <div class="tech-upgrade">
                                <img alt="Stone" src="img/resources/stone.svg">
                                <h4>Stone</h4>
                                <p>A common building material, required for many buildings.</p>
                            </div>
                            <div class="tech-upgrade">
                                <img alt="Stone" src="img/resources/production.svg">
                                <h4>Mine</h4>
                                <p>Common improvement that provides materials.</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="tech-path">
                    <div class="tech-card researched">
                        <div class="button iconbutton" title="Technology">
                            <img src="img/resources/wood.svg" alt="Tech icon">
                        </div>
                        <h3>Wood Working</h3>
                    </div>
                </div>
                <div class="tech-path">
                    <div class="tech-card">
                        <div class="button iconbutton" title="Technology">
                            <img src="img/resources/food.svg" alt="Tech icon">
                        </div>
                        <h3>Pottery</h3>
                    </div>
                </div>
                <div class="tech-path">
                    <div class="tech-card">
                        <div class="button iconbutton" title="Technology">
                            <img src="img/resources/food.svg" alt="Tech icon">
                        </div>
                        <h3>Fishing</h3>
                    </div>
                </div>
            </div>
            <div class="tech-era">
                <h3>Ancient Age</h3>
                <div class="tech-path">
                    <div class="tech-card unavailable">
                        <div class="button iconbutton" title="Technology">
                            <img src="img/resources/bronze.svg" alt="Tech icon">
                        </div>
                        <h3>Bronze Working</h3>
                    </div>
                    <div class="tech-card unavailable">
                        <div class="button iconbutton" title="Technology">
                            <img src="img/resources/iron.svg" alt="Tech icon">
                        </div>
                        <h3>Iron Working</h3>
                    </div>
                </div>
                <div class="tech-path">
                    <div class="tech-card">
                        <div class="button iconbutton" title="Technology">
                            <img src="img/resources/sandstone.svg" alt="Tech icon">
                        </div>
                        <h3>Masonry</h3>
                    </div>
                    <div class="tech-card unavailable">
                        <div class="button iconbutton" title="Technology">
                            <img src="img/resources/sandstone.svg" alt="Tech icon">
                        </div>
                        <h3>Monument Building</h3>
                    </div>
                </div>
                <div class="tech-path">
                    <div class="tech-card unavailable">
                        <div class="button iconbutton" title="Technology">
                            <img src="img/resources/food.svg" alt="Tech icon">
                        </div>
                        <h3>Agriculture</h3>
                    </div>
                    <div class="tech-card unavailable">
                        <div class="button iconbutton" title="Technology">
                            <img src="img/resources/horse_default.svg" alt="Tech icon">
                        </div>
                        <h3>Animal Domestication</h3>
                    </div>
                </div>
                <div class="tech-path">
                    <div class="tech-card unavailable">
                        <div class="button iconbutton" title="Technology">
                            <img src="img/resources/food.svg" alt="Tech icon">
                        </div>
                        <h3>Sailing</h3>
                    </div>
                    <div class="tech-card unavailable">
                        <div class="button iconbutton" title="Technology">
                            <img src="img/resources/wealth.svg" alt="Tech icon">
                        </div>
                        <h3>Trade</h3>
                    </div>
                </div>
            </div>
            <div class="tech-era">
                <h3>Classical Age</h3>
                <div class="tech-path">
                    <div class="tech-card unavailable">
                        <div class="button iconbutton" title="Technology">
                            <img src="img/resources/sword_copper.svg" alt="Tech icon">
                        </div>
                        <h3>Siege Warfare</h3>
                    </div>
                </div>
                <div class="tech-path">
                    <div class="tech-card unavailable">
                        <div class="button iconbutton" title="Technology">
                            <img src="img/resources/unknown1.svg" alt="Tech icon">
                        </div>
                        <h3>Unknown Stuff</h3>
                    </div>
                </div>
                <div class="tech-path">
                    <div class="tech-card unavailable">
                        <div class="button iconbutton" title="Technology">
                            <img src="img/resources/unknown1.svg" alt="Tech icon">
                        </div>
                        <h3>Farming</h3>
                    </div>
                </div>
                <div class="tech-path">
                    <div class="tech-card unavailable">
                        <div class="button iconbutton" title="Technology">
                            <img src="img/resources/wealth.svg" alt="Tech icon">
                        </div>
                        <h3>Currency</h3>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>