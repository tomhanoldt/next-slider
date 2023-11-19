export class PluginLoader {
  // private loaded: { [name: string]: any }
  // constructor(
  //   private formslider: any,
  //   private globalPluginConfig: any,
  // ) {
  //   this.loaded = {}
  // }
  // loadAll(plugins: any[]): any[] {
  //   const allPlugins: any[] = []
  //   for (const plugin of plugins) {
  //     if (!window[plugin.class]) {
  //       this.formslider.logger.warn(`loadAll(${plugin.class}) -> not found`)
  //       continue
  //     }
  //     allPlugins.push(this.load(plugin, false))
  //   }
  //   for (const plugin of allPlugins) {
  //     plugin.init()
  //   }
  //   return allPlugins
  // }
  // load(plugin: any, initPlugin: boolean = true): any {
  //   const PluginClass = window[plugin.class]
  //   let config
  //   if (!plugin.config) {
  //     config = this.globalPluginConfig
  //   } else {
  //     config = ObjectExtender.extend({}, this.globalPluginConfig, plugin.config)
  //   }
  //   try {
  //     const pluginInstance = new PluginClass(
  //       this.formslider,
  //       config,
  //       plugin.class,
  //     )
  //     this.loaded[plugin.class] = pluginInstance
  //     if (initPlugin) {
  //       pluginInstance.init()
  //     }
  //     return pluginInstance
  //   } catch (error) {
  //     this.formslider.logger.error(
  //       `loadPlugin(${plugin.class}) -> error`,
  //       error,
  //     )
  //   }
  // }
  // isLoaded(name: string): boolean {
  //   return name in this.loaded
  // }
  // get(name: string): any {
  //   if (!this.isLoaded(name)) {
  //     return
  //   }
  //   return this.loaded[name]
  // }
}
