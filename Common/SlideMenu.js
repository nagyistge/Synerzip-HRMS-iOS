'use strict'

var React = require('react-native')
var {
    Animation,
    PanResponder,
    StyleSheet,
    View,
    Animated
    } = React

var Dimensions = require('Dimensions')
var screenWidth = Dimensions.get('window').width

var SlideMenu = React.createClass({
    componentWillMount: function() {
        this.offset = 0 // Contains the center view offset from the left edge
        this._panGesture = PanResponder.create({
            onMoveShouldSetPanResponder: (evt, gestureState) => {
                return Math.abs(gestureState.dx) > Math.abs(gestureState.dy)
                    && Math.abs(gestureState.dx) > 20
            },
            onPanResponderGrant: (evt, gestureState) => this.left = 0,
            onPanResponderMove: (evt, gestureState) => this.moveCenterView(gestureState.dx),
            onPanResponderRelease: (evt, gestureState) => this.moveFinished(evt, gestureState),
            onPanResponderTerminate: this.moveFinished,
        })
    },

    moveCenterView: function(left) {
        if (!this.center) return

        if ((this.offset + left) < 0) {
            this.left = -this.offset
        } else {
            this.left = left
        }

        this.center.setNativeProps({left: this.offset + this.left})
    },

    moveFinished: function(evt, gestureState) {
        if (!this.center) return

        var offset = this.offset + this.left

        if (this.offset === 0) {
            if (offset > screenWidth * 0.25) {
                this.offset = 120
            }
        } else {
            if (offset < screenWidth * 0.5) {
                this.offset = 0
            }
        }
        //Animated.decay(new Animated.ValueXY(), {   // coast to a stop
        //    velocity: {x: gestureState.vx, y: gestureState.vy}, // velocity from gesture release
        //    deceleration: 0.997,
        //}).start();
        //Animation.startAnimation(this.center, 400, 0, 'easeInOut', {'anchorPoint.x': 0, 'position.x': this.offset})
       this.center.setNativeProps({left: this.offset})
    },

    render: function() {
        var centerView = this.props.renderCenterView ? this.props.renderCenterView() : null
        var leftView = this.props.renderLeftView ? this.props.renderLeftView() : null

        return (
            <View style={[styles.container, this.props.style]}>
                <Animated.View style={styles.left}>
                    {leftView}
                </Animated.View>
                <Animated.View
                    style={[styles.center, {left: this.offset}]}
                    ref={(center) => this.center = center}
                    {...this._panGesture.panHandlers}>
                    {centerView}
                </Animated.View>
            </View>
        )
    },
})

var styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    center: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
    left: {
        position: 'absolute',
        top:0,
        left:0,
        bottom:0,
        right: 0,
        backgroundColor: '#FFFFFF',
    },
})

module.exports = SlideMenu