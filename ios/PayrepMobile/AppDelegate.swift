import UIKit
import React
import React_RCTAppDelegate
import ReactAppDependencyProvider // remove if not using Expo Modules

@main
class AppDelegate: RCTAppDelegate {

  override func application(
    _ application: UIApplication,
    didFinishLaunchingWithOptions launchOptions: [UIApplication.LaunchOptionsKey : Any]? = nil
  ) -> Bool {

    // Must match AppRegistry.registerComponent(...)
    self.moduleName = "PayRep"
    self.initialProps = [:]

    // Remove these two lines if you're not using Expo Modules
    self.dependencyProvider = RCTAppDependencyProvider()

    // Let RN create the window and initial root VC
    let ok = super.application(application, didFinishLaunchingWithOptions: launchOptions)

    // ---- Option B: Re-root first, then attach RN VC ----
    let window = self.window

    // If RN (or something else) already gave us a UINavigationController, do nothing
    if window.rootViewController is UINavigationController {
      return ok
    }

    // Capture the RN root *before* we change the window root
    guard let rnRootVC = window.rootViewController else { return ok }

    // 1) Create an *empty* nav controller
    let nav = UINavigationController()
    nav.setNavigationBarHidden(true, animated: false)

    // 2) Re-root the window to the nav FIRST
    window.rootViewController = nav
    window.makeKeyAndVisible()

    // 3) Now it's safe to install the previous RN root into the nav
    nav.setViewControllers([rnRootVC], animated: false)
    // -----------------------------------------------

    return ok
  }

  // JS bundle URL
  override func sourceURL(for bridge: RCTBridge!) -> URL! { bundleURL() }

  override func bundleURL() -> URL! {
    #if DEBUG
      return RCTBundleURLProvider.sharedSettings().jsBundleURL(forBundleRoot: "index")
    #else
      return Bundle.main.url(forResource: "main", withExtension: "jsbundle")
    #endif
  }
}
