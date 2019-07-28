(function() {
  "use strict";

  function SizeSelector(props) {
    function sizeOptions() {
      return props.sizes.map(function(num) {
        return (
          <option value={num} key={num}>
            {num}
          </option>
        )
      });
    }

    function onSizeChange(evt) {
      props.handleSizeChange(evt.target.value);
    }

    return (
      <div className="field-group">
        <label htmlFor="size-options">Size:</label>
        <select defaultValue={props.size}name="sizeOptions" id="size-options" onChange={onSizeChange}>
          {sizeOptions()}
        </select>
      </div>
    );
  }

  function ColorSelector(props) {
    function colorOptions() {
      return props.colors.map(function(name) {
        return (
          <option value={name} key={name}>
            {name}
          </option>
        )
      });
    }

    function onColorChange(evt) {
      props.handleColorChange(evt.target.value);
    }

    return (
      <div className="field-group">
        <label htmlFor="color-options">Color:</label>
        <select defaultValue={props.color}name="colorOptions" id="color-options" onChange={onColorChange}>
          {colorOptions()}
        </select>
      </div>
    );
  }

  function ProductImage(props) {
    return <img src={`assets/${props.color}.jpg`} alt="Product Image" />;
  }

  var ProductCustomizer = createReactClass({
    getInitialState: function() {
      return {
        color: "red",
        colors: window.Inventory.allColors,
        size: 8,
        sizes: window.Inventory.allSizes
      }
    },

    handleSizeChange: function(selectedSize) {
      var availableColors = window.Inventory.bySize[selectedSize];
      this.setState({
        colors: availableColors
      });
    },
    handleColorChange: function(selectedColor) {
      this.setState({
        sizes: window.Inventory.byColor[selectedColor],
        color: selectedColor
      });
    },

    render: function() {
      return (
        <div className="customizer">
          <div className="ProductImage">
            <ProductImage color={this.state.color}/>
          </div>
          <div className="selectors">
            <SizeSelector size={this.state.size} sizes={this.state.sizes} handleSizeChange={this.handleSizeChange}/>
            <ColorSelector color={this.state.color} colors={this.state.colors} handleColorChange={this.handleColorChange}/>
          </div>
        </div>
      );
    }
  });

  function ProductCustomizer(props) {
      return (
        <div className="customizer">
          <div className="ProductImage">
            <ProductImage color="green"/>
          </div>
          <div className="selectors">
            <SizeSelector size={8}/>
          </div>
        </div>
      );
  }

  ReactDOM.render(<ProductCustomizer />, document.getElementById('react-root'));

})();
