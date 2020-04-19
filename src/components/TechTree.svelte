<style lang="less">
    @import url("../less/layout.less");

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
</style>

<script>
    
</script>

<div class="popup">
    <button class="hyperlink closewindow" title="Close" on:click>
        <img class="tiny-icon" src="img/menuicons/close.svg" alt="Close window">
    </button>
    <h2 class="center"><img src="img/resources/science.svg" alt="Science" class="tiny-icon"> Research</h2>
    <div id="techtree-container">
        <div id="techtree">
            <div class="tech-era">
                <h3>Prehistoric Age</h3>
                <div class="tech-path">
                    <div class="tech-card">
                        <div class="button iconbutton" title="Technology">
                            <img src="img/resources/production.svg" alt="Tech icon">
                        </div>
                        <h3>Stone Tools</h3>
                    </div>
                </div>
                <div class="tech-path">
                    <div class="tech-card">
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
                    <div class="tech-card">
                        <div class="button iconbutton" title="Technology">
                            <img src="img/resources/bronze.svg" alt="Tech icon">
                        </div>
                        <h3>Bronze Working</h3>
                    </div>
                    <div class="tech-card">
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
                    <div class="tech-card">
                        <div class="button iconbutton" title="Technology">
                            <img src="img/resources/sandstone.svg" alt="Tech icon">
                        </div>
                        <h3>Monument Building</h3>
                    </div>
                </div>
                <div class="tech-path">
                    <div class="tech-card">
                        <div class="button iconbutton" title="Technology">
                            <img src="img/resources/food.svg" alt="Tech icon">
                        </div>
                        <h3>Agriculture</h3>
                    </div>
                    <div class="tech-card">
                        <div class="button iconbutton" title="Technology">
                            <img src="img/resources/horse_default.svg" alt="Tech icon">
                        </div>
                        <h3>Animal Domestication</h3>
                    </div>
                </div>
                <div class="tech-path">
                    <div class="tech-card">
                        <div class="button iconbutton" title="Technology">
                            <img src="img/resources/food.svg" alt="Tech icon">
                        </div>
                        <h3>Sailing</h3>
                    </div>
                    <div class="tech-card">
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
                    <div class="tech-card">
                        <div class="button iconbutton" title="Technology">
                            <img src="img/resources/sword_copper.svg" alt="Tech icon">
                        </div>
                        <h3>Siege Warfare</h3>
                    </div>
                </div>
                <div class="tech-path">
                    <div class="tech-card">
                        <div class="button iconbutton" title="Technology">
                            <img src="img/resources/unknown1.svg" alt="Tech icon">
                        </div>
                        <h3>Unknown Stuff</h3>
                    </div>
                </div>
                <div class="tech-path">
                    <div class="tech-card">
                        <div class="button iconbutton" title="Technology">
                            <img src="img/resources/unknown1.svg" alt="Tech icon">
                        </div>
                        <h3>Farming</h3>
                    </div>
                </div>
                <div class="tech-path">
                    <div class="tech-card">
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