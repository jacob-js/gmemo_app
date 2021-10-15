package com.gmemo_app;

import com.facebook.react.ReactActivity;
import android.os.Bundle;
import org.reactnative.camera.RNCameraPackage;

public class MainActivity extends ReactActivity {

  /**
   * Returns the name of the main component registered from JavaScript. This is used to schedule
   * rendering of the component.
   */
  @Override
  protected String getMainComponentName() {
    return "gmemo_app";
  }

  @Override
  protected void onCreate(Bundle savedInstanceState) {
    super.onCreate(null);
  }
}
