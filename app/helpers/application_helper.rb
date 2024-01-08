module ApplicationHelper
  def vue_island(name, init_props: {}, mount: false , &block)
    content_tag("vue-island", '', "data-name": name, "data-init-props": init_props.to_json, "data-mount-mode": mount) do
      yield if block_given?
    end
  end

  def vue2_island(name, init_props: {}, mount: false , &block)
    content_tag("vue2-island", '', "data-name": name, "data-init-props": init_props.to_json, "data-mount-mode": mount) do
      yield if block_given?
    end
  end
end
