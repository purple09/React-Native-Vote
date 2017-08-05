package com.first.view.rn.CardView;

import android.view.View;

import com.facebook.react.uimanager.PixelUtil;
import com.facebook.react.uimanager.ThemedReactContext;
import com.facebook.react.uimanager.ViewGroupManager;
import com.facebook.react.uimanager.annotations.ReactProp;
import com.facebook.react.views.view.ReactViewGroup;

/**
 * Created by guizhen on 2017/7/27.
 */

public class RNCardViewManager extends ViewGroupManager<RNCardView> {

    public static final String REACT_CLASS = "RNCardView";

    @Override
    public String getName() {
        return REACT_CLASS;
    }

    @Override
    protected RNCardView createViewInstance(ThemedReactContext reactContext) {
        RNCardView cardView = new RNCardView(reactContext);
        cardView.setUseCompatPadding(true);
        ReactViewGroup reactViewGroup = new ReactViewGroup(reactContext);
        cardView.addView(reactViewGroup);
        return cardView;
    }

    @ReactProp(name = "cornerRadius", defaultFloat = 0f)
    public void setCornerRadius(RNCardView view, float cornerRadius) {
        view.setRnCornerRadius(PixelUtil.toPixelFromDIP(cornerRadius));
    }

    @ReactProp(name = "cardElevation", defaultFloat = 0f)
    public void setCardElevation(RNCardView view, float elevation) {
        view.setRnElevation(elevation);
    }

    @ReactProp(name = "cardMaxElevation", defaultFloat = 0f)
    public void setCardMaxElevation(RNCardView view, float elevation) {
        view.setRnMaxElevation(elevation);
    }

    @ReactProp(name = "backgroundColor")
    public void setCardBackgroundColor(RNCardView view, int color) {
        view.setRnBackgroundColor(color);
    }

/*
    @ReactProp(name = "contentPadding")
    public void setCardContentPadding(RNCardView view, ReadableArray paddings) {
        int paddingTop = 0;
        int paddingRight = 0;
        int paddingBottom = 0;
        int paddingLeft = 0;
        if (paddings.size() == 1) {
            paddingTop = paddingRight = paddingBottom = paddingLeft = paddings.getInt(0);
        } else if (paddings.size() == 2) {
            paddingTop = paddingBottom = paddings.getInt(0);
            paddingLeft = paddingRight = paddings.getInt(1);
        } else if (paddings.size() == 3) {
            paddingTop = paddings.getInt(0);
            paddingLeft = paddingRight = paddings.getInt(1);
            paddingBottom = paddings.getInt(2);
        } else if (paddings.size() >= 4) {
            paddingTop = paddings.getInt(0);
            paddingRight = paddings.getInt(1);
            paddingBottom = paddings.getInt(2);
            paddingLeft = paddings.getInt(3);
        } else {
            return;
        }
        view.setContentPadding(paddingLeft, paddingTop, paddingRight, paddingBottom);
    }
*/

    @Override
    public View getChildAt(RNCardView parent, int index) {
        View content = parent.getChildAt(0);
        if (content != null && content instanceof ReactViewGroup) {
            return ((ReactViewGroup) content).getChildAt(index);
        }
        return null;
    }

    @Override
    public int getChildCount(RNCardView parent) {
        View content = parent.getChildAt(0);
        if (content != null && content instanceof ReactViewGroup) {
            return ((ReactViewGroup) content).getChildCount();
        }
        return 0;
    }


    @Override
    public void addView(RNCardView parent, View child, int index) {
        View content = parent.getChildAt(0);
        if (content != null && content instanceof ReactViewGroup) {
            ((ReactViewGroup) content).addView(child, index);
        }
    }

    @Override
    public void removeViewAt(RNCardView parent, int index) {
        View content = parent.getChildAt(0);
        if (content != null && content instanceof ReactViewGroup) {
            ((ReactViewGroup) content).removeViewAt(index);
        }
    }

    @Override
    public void removeAllViews(RNCardView parent) {
        View content = parent.getChildAt(0);
        if (content != null && content instanceof ReactViewGroup) {
            ((ReactViewGroup) content).removeAllViews();
        }
    }
}