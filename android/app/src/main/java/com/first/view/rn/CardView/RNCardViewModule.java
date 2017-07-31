package com.first.view.rn.CardView;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;

/**
 * Created by guizhen on 2017/7/27.
 */

public class RNCardViewModule extends ReactContextBaseJavaModule {

    private final ReactApplicationContext reactContext;

    public RNCardViewModule(ReactApplicationContext reactContext) {
        super(reactContext);
        this.reactContext = reactContext;
    }

    @Override
    public String getName() {
        return "RNCardView";
    }
}